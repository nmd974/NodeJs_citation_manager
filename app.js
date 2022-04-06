const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Rajout pour lire le fichier .env
require('dotenv').config()

const db = require('./db');
const path = require('path');



//Pour parser le contenu des formulaires
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
  
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

//Au lancement de l'appplication on affiche la vue liste
app.set('view engine', 'ejs');//On indique que l'on va utiliser ejs
app.set('views', path.resolve( __dirname, 'views') ); // the views folder for the *.ejs files
 
app.get("/api/citation/", (req, res) => {
    res.render('liste');
});

//ROUTING
const citations = require('./routes/routes');
app.use('/api/citations', citations);


// app.use((error, req, res, next) => {
//     if (res.headerSent) {
//       return next(error);
//     }
//     res.status(error.code || 500)
//     res.json({ message: error.message || 'Une erreur inconnue est survenue' });
//     res.json
//   });
  
  //Acces au serveur + check avant si la bdd est bien connectée
  db.initDb((err, db) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(process.env.PORT || 3100)
    }
  });