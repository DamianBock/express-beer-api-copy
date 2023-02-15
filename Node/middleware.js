var express = require('express'),
    router = express.Router();
    module.exports = router;

const HausA = [];
const properties= ["Titel","Adresse","Beschreibung","Groesse","Interessenten"];
const person = ["Opa", "Oma", "Mama", "Papa", "Lama", "Tom", "Klara","coole Beluga", "europäische Barakuda","Abdullah", "Single","Merkel","Zebra","Panda"];
const streetnames = ["Geizhals", "blaue", "rote", "Uweseeler","Flunder", "enge","breite","offene","dunkle","alte"];
const Typen = ["Wohnung", "Haus", "Bauplatz" ];
createTestData();createTestData();createTestData();createTestData();
router.get('/HausA', (req, res) => {
        if (HausA.length === 0) {
            resolveNotFound(res, `Kein Haus gefunden 🥺`)
        } else {
            res.statusCode = 200;
            res.json(HausA);
            res.end();
        }
    });
    
    router.get('/Haus/searchID/:ID', (req, res) => {
        const { ID } = req.params;
        const Haus = getHaus(ID);
        if (!Haus) {
            resolveNotFound(res, ID + ` nicht gefunden`)
        } else {
            res.statusCode = 200;
            res.json(Haus);
            res.end();
        }
    })
    
    router.get('/Haus/Interessenten/:ID', (req, res) => {
        const { ID } = req.params;
        const Haus = getHaus(ID);
        if (!Haus) {
            resolveNotFound(res, getHaus(ID).Titel + ` nicht gefunden`)
        } else {
            res.statusCode = 200;
            res.json(Haus.Interessenten);
            res.end();
        }
    });
    
    router.get('/HausA/searchTyp/:Typ', (req, res) => {
        HausATemp = [];
        const { Typ} = req.params;
        switch (Typ) {
            case "Wohnung": break;
            case "Haus": break;
            case "Bauplatz": break;
            default:resolveBadRequest(res, 'Falscher Typ'); return; }
        for(Haus of HausA){
            if(Haus.Typ === Typ){
                HausATemp.push(Haus);
        }}
        if (HausATemp.length === 0) {
            resolveNotFound(res, `Kein Haus gefunden unter diesem Typ 🥺`)
        } else {
            res.statusCode = 200;
            res.json(HausATemp);
            res.end();
        }
    });
    router.get('/HausA/searchAdresse/:Adresse', (req, res) => {
        HausATemp = [];
        const { Adresse} = req.params;
        for(Haus of HausA){
            if(Haus.Adresse === Adresse){
                HausATemp.push(Haus);
        }}
        if (HausATemp.length === 0) {
            resolveNotFound(res, `Kein Haus gefunden mit dieser Adresse 🥺`)
        } else {
            res.statusCode = 200;
            res.json(HausATemp);
            res.end();
        }
    });
    router.post('/Haus', (req, res) => {
        for(let i = 0; i < (properties.length-2); i++) {
        if (!req.body.hasOwnProperty(properties[i])) {
            resolveBadRequest(res, '"' + Haus[i]+ '" fehlt');
            return;}}
        switch (req.body.Typ) {
            case "Wohnung": break;
            case "Haus": break;
            case "Bauplatz": break;
            default:resolveBadRequest(res, 'Falscher Typ'); 
                    return;}
        req.body.Interessenten =0;
        req.body.ID = findnewID(HausA);
        HausA.push(req.body);
        res.statusCode = 200;
        res.json(req.body);
    });
    
    router.delete('/Haus/:ID', (req, res) => {
        const { ID} = req.params;
        console.log(ID);
        if (!ID) {
            resolveBadRequest(res, '"ID" fehlt');
        }
        const HausIndex = getHausIndex(ID);
        console.log(HausIndex);
        if (HausIndex !== -1) {
            HausA.splice(HausIndex, 1);
            res.statusCode = 200;
            res.send(`${ID} entfernt!`);
        } else {
            resolveNotFound(res, ` Haus ${ID} nicht gefunden`);
        }
    })
    router.put('/Haus/:ID', (req, res) => {
        const { ID} = req.params;
        for(let i = 0; i < (properties.length-2); i++) {
            if (!req.body.hasOwnProperty(properties[i])) {
                resolveBadRequest(res, '"${properties[i]}" fehlt');
                return;}}
        const HausIndex = getHausIndex(ID)
        if (HausIndex !== -1) {
            HausA.splice(HausIndex, 1, req.body);
            HausA[HausIndex].Interessenten =0;
            HausA[HausIndex].ID = ID;
            res.statusCode = 200;
            res.send(`${ID} updated`);
        } else {
            resolveNotFound(res, 'Haus' + ID +' nicht gefunden');
        }
    })
    
    
    router.put('/InteressentenP/:ID', (req, res) => {
        const { ID} = req.params;
        
        const HausIndex = getHausIndex(ID)
        if (HausIndex !== -1) {       
            HausA[HausIndex].Interessenten = HausA[HausIndex].Interessenten +1 ;
            res.statusCode = 200;
            res.send(`${ID} updated`);
        } else {
            resolveNotFound(res, getHaus(ID).Titel+' nicht gefunden');
        }
    })
    router.put('/InteressentenM/:ID', (req, res) => {
        const { ID} = req.params;
        
        const HausIndex = getHausIndex(ID)
        if (HausIndex !== -1) {       
            HausA[HausIndex].Interessenten =HausA[HausIndex].Interessenten-1;
            res.statusCode = 200;
            res.send(`${ID} updated`);
        } else {
            resolveNotFound(res, getHaus(ID).Titel+' nicht gefunden');
        }
    })
    function getHausIndex(ID) {
        console.log(ID);
        return HausA.findIndex((Haus) => Haus.ID== ID);
    }
    function createTestData(){
    a = getRandomInt(3);
    b = getRandomInt(3);
    c = getRandomInt(3);
       HausA.push({ Titel:getTitel(a),Adresse:randomElement(streetnames)+ "  Straße "+(getRandomInt(80)+1),Beschreibung:"Joa ist schick",Groesse:(getRandomInt(800)+1)+"m²",Interessenten:getRandomInt(800),ID: findnewID(HausA) ,Typ:Typen[a]});
       HausA.push({ Titel:getTitel(b),Adresse:randomElement(streetnames)+ " Straße "+(getRandomInt(80)+1),Beschreibung:"Christian Lindner <3",Groesse:(getRandomInt(800)+1)+"m²",Interessenten:getRandomInt(800),ID:findnewID(HausA),Typ:Typen[b]});
       HausA.push({ Titel:getTitel(c),Adresse:randomElement(streetnames)+ " Straße "+(getRandomInt(80)+1),Beschreibung:"Tiere sind Pflicht",Groesse:(getRandomInt(800)+1)+"m²",Interessenten:getRandomInt(800),ID:findnewID(HausA),Typ:Typen[c]});
    }
    function getHaus(ID) {
        return HausA.find((Haus) => Haus.ID== ID);
    }
    
    function resolveNotFound(res, message) {
        res.statusCode = 404;
        res.send(message);
        res.end();
        return;
    }
    
    function resolveBadRequest(res, message) {
        res.statusCode = 400;
        res.send(message);
        res.end();
        return;
    }
    function findnewID(Arr){
        if (Arr.length == 0) {
            return 1;
        }  
        return Arr[Arr.length - 1].ID +1;
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    function randomElement(Arr){
       return Arr[getRandomInt(Arr.length)];
    }
    function getMehrzahl(num,per){
        if(num>1)return num + " " + per +"s"
        return num + " " + per
    }
    function getTitel(ID){
        return Typen[ID] + " für "+ getMehrzahl(getRandomInt(6)+1,randomElement(person))+ " und " +getMehrzahl(getRandomInt(6)+1,randomElement(person));
    }