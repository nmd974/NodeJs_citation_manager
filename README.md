# Projet
Ce projet permet de réaliser simplement un CRUD avec node js et mongodb.

# BDD
Utiliser Mongo Atlas pour héberger gratuitement un base de données mongodb.

citations : [
    {
        _id : ObjectId,
        content : string,
        author : string,
        tags:[ObjectId, ObjectId]
    }
]
tags : [
    {
        _id : ObjectId,
        label : string
    }
]
# LANCEMENT

npm install

2 options de lancement :

## 1
Créer un fichier .env à la racine et renseigner les informations ci-dessous : 
- PORT=
- DB_USER=
- DB_PASSWORD=
- DB_NAME=

npm start.

## 2
Vous pouvez utiliser nodemon pour que les pages se rechargent directement.
Créer un fichier nodemon.json à la racine.
Rajouter les informations ci-dessous :
{
    "env": {
        "DB_USER": "",
        "DB_PASSWORD": "",
        "DB_NAME" : ""
    }
}

npm run dev
# LIBRARIES UTILISEES
- express
- body-parser
- path
- nodemon
- mongodb
- dotenv
- ejs
- express-ejs-layouts

# AMELIORATIONS
- [] Afficher des modal pour confirmer la suppression d'une citation
- [] Remettre correctement les methodes des formulaires
- [x] Ajouter les thématiques des citations
- [x] Ajouter la validation des données des formulaires
- [] Ajouter la validation des données des formulaires cote back
- [] Ajouter une recherche sur (selon soit tags soit dans le contenu de la citation)