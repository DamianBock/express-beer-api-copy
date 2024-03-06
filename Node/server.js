const express = require('express');
const cors = require("cors");
const fs = require("fs");
const { router } = require('express');
const app = express();
const port = 8080;
const Routes = require("./middleware");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use("/", Routes);

const logger = (req, res, next) => {
    console.log(`Received Request ${new Date(Date.now()).toLocaleString('de-DE')}`);
    console.log('HTTP METHOD', req.method);
    console.log('HTTP BODY', req.body);
    console.log('URL PARAMETER', req.params);
    next();
}
module.exports = router;
app.use(logger);

// Delete all files in uploads directory on server startup
fs.readdir("uploads", (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.unlink(`uploads/${file}`, err => {
      if (err) throw err;
    });
  }
});

app.listen(port, () => {
    console.log('Running...');
});
