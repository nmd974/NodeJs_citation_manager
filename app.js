const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

//Rajout pour lire le fichier .env
require('dotenv').config()

const db = require('./db');
const path = require('path');



//Pour parser le contenu des formulaires
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

//Récupération des fichiers statics
app.use('/static', express.static(path.join(__dirname, 'static')));

//Définition des headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

//Gestion du templating
app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');
app.set('views', path.resolve( __dirname, 'views') );
 
app.get("/api/citation/", (req, res) => {
    res.render('liste', {title: "Liste des citations", layout: './layouts/full-width'});
});

//ROUTING
const citations = require('./routes/routes');
app.use('/api/citations', citations);

  //Acces au serveur + check avant si la bdd est bien connectée
  db.initDb((err, db) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(process.env.PORT || 3100)
    }
  });