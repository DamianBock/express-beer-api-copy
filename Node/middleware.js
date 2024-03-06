var express = require('express'),
    router = express.Router();
    module.exports = router;
/* Declare dependencies */
const multer = require('multer');
const path = require('path');
const { faker } = require('@faker-js/faker');
faker.setLocale('de');
const HausA = [];
const adjectives = ["Gemütlich", "Geräumig", "Modern", "Rustikal", "Schick", "Klein", "Groß", "Funktional", "Stilvoll", "Luxuriös"];
/* Set up multer storage */
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

/* Route to get all properties */
router.get('/HausA', (req, res) => {
  if (HausA.length === 0) {
    resolveNotFound(res, `Kein Haus gefunden 🥺`)
  } else {
    res.status(200).json(HausA);
  }
});

/* Route to search for a property by ID */
router.get('/Haus/searchID/:ID', (req, res) => {
  const { ID } = req.params;
  const Haus = getHaus(ID);
  if (!Haus) {
    resolveNotFound(res, `Immobilie ${ID} nicht gefunden`)
  } else {
    res.status(200).json(Haus);
  }
});

/* Route to update a property's picture by ID */
router.put('/HausBild/:ID', upload.single('picture'), (req, res) => {
  const { ID } = req.params;
  const Haus = getHaus(ID);
  if (!Haus) {
    resolveNotFound(res, `Immobilie ${ID} nicht gefunden`);
  } else if (!req.file) {
    resolveBadRequest(res, 'Es wurde kein Bild hochgeladen.');
  } else {
    Haus.ppath = req.file.path;if (Haus.Interessenten >= 3) {res.status(403).send(`Immobilie ${ID} hat mindestens drei Interessenten und kann nicht entfernt oder bearbeitet werden.`);}
    res.status(200).send(`Immobilie ${ID} mit Bild  ${req.file.filename} aktualisiert`);
  }
});

/* Route to get all interested people in a property */
router.get('/Haus/Interessenten/:ID', (req, res) => {
  const { ID } = req.params;
  const Haus = getHaus(ID);
  if (!Haus) {
    resolveNotFound(res, `Immobilie ${ID} nicht gefunden`);
  } else {
    res.status(200).json(Haus.Interessenten);
  }
});

/* Route to search for a property by address */
router.get('/HausA/address/:address', (req, res) => {
  const query = req.params.address.toLowerCase();
  const properties = HausA.filter(p => p.entry.address.toLowerCase().includes(query));
  if (properties.length > 0) {
    res.status(200).json(properties);
  } else {
    resolveNotFound(res, 'Keine Immobilien mit dieser Adresse gefunden');
  }
});
// This route returns all properties of a certain type
router.get('/HausA/type/:type', (req, res) => {
  const type = req.params.type;
  const properties = findPropertiesByType(type, HausA);
  if (properties.length > 0) {
    res.status(200).json(properties);
  } else {
    resolveNotFound(res, `Keine ${type}-Immobilien gefunden`);
  }
});

// This route creates a new property
router.post('/Haus', (req, res) => {
  const allowedTypes = ["Wohnung", "Haus", "Bauplatz"];

  if (req.body.hasOwnProperty("entry") && req.body.hasOwnProperty("createdBy")) {
    const entry = req.body.entry;
    if (
      entry.hasOwnProperty("type") &&
      entry.hasOwnProperty("address") &&
      entry.hasOwnProperty("postal") &&
      entry.hasOwnProperty("city") &&
      entry.hasOwnProperty("size") &&
      entry.hasOwnProperty("comment") &&
      entry.hasOwnProperty("shortHand")
    ) {
      if (!allowedTypes.includes(entry.type)) {
        resolveBadRequest(res, 'Falscher Typ');
      } else {
        req.body.createdOn = new Date().toISOString();
        req.body.Interessenten = 0;
        req.body.ID = findnewID(HausA);
        HausA.push(req.body);
        res.status(200).json(req.body);
      }
    } else {
      resolveBadRequest(res, "Falsches JSON Format oder Daten fehlen");
    }
  } else {
    resolveBadRequest(res, "Falsches JSON Format oder Daten fehlen");
  }
});

// This route deletes a property
router.delete('/Haus/:ID', (req, res) => {
  const { ID } = req.params;
  console.log(ID);
  if (!ID) {resolveBadRequest(res, '"ID" fehlt');}
  const HausIndex = getHausIndex(ID);
  console.log(HausIndex);
  if (HausIndex !== -1) {
    // Check if property has at least three interested users AUFGABE 3
    if (HausA[HausIndex].Interessenten >= 3) {
      res.status(403).send(`Immobilie ${ID} hat mindestens drei Interessenten und kann nicht entfernt oder bearbeitet werden.`);} else {
      HausA.splice(HausIndex, 1);
      res.status(200).send(`Immobilie ${ID} entfernt!`);}} else {   
    resolveNotFound(res, `Immobilie ${ID} nicht gefunden`);
  }
});

// This route updates an existing property
router.put('/Haus/:ID', (req, res) => {
  const allowedTypes = ["Wohnung", "Haus", "Bauplatz"];
  const { ID } = req.params;
  const HausIndex = getHausIndex(ID);
  if (req.body.hasOwnProperty("entry") && req.body.hasOwnProperty("createdBy")) {
    const entry = req.body.entry;
    if (
      entry.hasOwnProperty("type") &&
      entry.hasOwnProperty("address") &&
      entry.hasOwnProperty("postal") &&
      entry.hasOwnProperty("city") &&
      entry.hasOwnProperty("size") &&
      entry.hasOwnProperty("comment") &&
      entry.hasOwnProperty("shortHand")
    ) {
      if (!allowedTypes.includes(entry.type)) {
        resolveBadRequest(res, 'Falscher Typ');
      } else {
        req.body.createdOn = new Date().toISOString();
        req.body.Interessenten = 0;
        req.body.ID = ID;
        // Check if property has at least three interested users Aufgabe 3
    if (HausA[HausIndex].Interessenten >= 3) {res.status(403).send(`Immobilie ${ID} hat mindestens drei Interessenten und kann nicht entfernt oder bearbeitet werden.`);}
        HausA[HausIndex] = req.body;
        res.status(200).send(`${ID} updated`);
      }
    } else {
      resolveBadRequest(res, "Falsches JSON Format oder Daten fehlen");
    }
  } else {
    resolveBadRequest(res, "Falsches JSON Format oder Daten fehlen");
  }
});


// Route to increment the number of interested users in a certain property
router.put('/InteressentenP/:ID', (req, res) => {
  const { ID } = req.params;
  if (!ID) {
    resolveBadRequest(res, 'ID parameter is missing');
  }
  const HausIndex = getHausIndex(ID)
  if (HausIndex) {
    HausA[HausIndex].Interessenten = HausA[HausIndex].Interessenten + 1;
    res.statusCode = 200;
    res.send(`${ID} updated`);
  } else {
    resolveNotFound(res, `${ID} nicht gefunden`);
  }
});

// Route to decrement the number of interested users in a certain property
router.put('/InteressentenM/:ID', (req, res) => {
  const { ID } = req.params;
  if (!ID) {
    resolveBadRequest(res, 'ID parameter is missing');
  }
  const HausIndex = getHausIndex(ID)
  if (HausIndex ) {
    HausA[HausIndex].Interessenten = HausA[HausIndex].Interessenten - 1;
    res.statusCode = 200;
    res.send(`${ID} updated`);
  } else {
    resolveNotFound(res, `${ID} nicht gefunden`);
  }
});

// Route to add a single random property to HausA
router.post('/addRandomHaus', (req, res) => {
  const randomHaus = generateRandomHaus();
  HausA.push(randomHaus);
  res.status(200).json("Eine Immobilie hinzugefügt");
});

// Route to add a specified number of random properties to HausA
router.post('/addRandomHaus/:times', (req, res) => {
  const { times } = req.params;
  if (!times || isNaN(times)) {
    resolveBadRequest(res, 'Invalid times parameter');
    return;
  }
  for (let i = 0; i < times; i++) {
    const randomHaus = generateRandomHaus();
    HausA.push(randomHaus);
  }
  res.status(200).json(`${times} immobilien hinzugefügt`);
});


// Function to generate a random property object
function generateRandomHaus() {
  const allowedTypes = ["Wohnung", "Haus", "Bauplatz"];
  const type = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
  const address = faker.address.streetAddress();
  const postal = faker.address.zipCode();
  const city = faker.address.city();
  const size = Math.floor(Math.random() * 1000 +1);
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const comment = `Dieses ${type.toLowerCase()} ist wirklich ${adjective.toLowerCase()}.`;
  const shortHand = `${adjective} ${type} in ${city}`;
  const Interessenten = Math.floor(Math.random() * 31);
  const createdOn = faker.date.between('2021-01-01', '2023-03-21').toISOString();
  const ID = findnewID(HausA);
  return {
      createdBy: "Zufälliger Benutzer",
      createdOn,
      entry: {
          type,
          address,
          postal,
          city,
            size,
          comment,
            shortHand,
      },
      ID,
      Interessenten,
  };
}
  // Helper function to send 404 Not Found response
function resolveNotFound(res, message) {
  res.status(404).json({ error: message });
}

// Helper function to send 400 Bad Request response
function resolveBadRequest(res, message) {
  res.status(400).json({ error: message });
}

// Helper function to find the index of a property by its ID
function getHausIndex(ID) {
  return HausA.findIndex((haus) => haus.ID === parseInt(ID));
}

// Helper function to find a property by its ID
function getHaus(ID) {
  return HausA.find((haus) => haus.ID === parseInt(ID));
}

// Helper function to find properties of a certain type
function findPropertiesByType(type, properties) {
  return properties.filter((p) => p.entry.type === type);
}

// Helper function to find a new ID for a property
function findnewID(properties) {
  if (properties.length === 0) {
    return 1;
  } else {
    return Math.max(...properties.map((p) => p.ID)) + 1;
  }
}
// Helper function to add a random Haus
function addRandomHaus() {
  const newHaus = generateRandomHaus();
  HausA.push(newHaus);
}
addRandomHaus();addRandomHaus();addRandomHaus();addRandomHaus();addRandomHaus();
addRandomHaus();addRandomHaus();addRandomHaus();addRandomHaus();addRandomHaus();
addRandomHaus();addRandomHaus();addRandomHaus();addRandomHaus();addRandomHaus();
addRandomHaus();addRandomHaus();addRandomHaus();addRandomHaus();addRandomHaus();