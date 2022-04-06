const MongoClient = require('mongodb').MongoClient;

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c7wsf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const dbName = process.env.DB_NAME;

let _db;

const initDb = callback => {

    if (_db) {
        console.log("La base de donnée est déjà connectée");
        return callback(null, _db);
    }

    MongoClient.connect(url, connected);
    function connected(err, db) {
        if (err) {
            return callback(err);
        }
        console.log("Base de donnée connectée");
        _db = db.db(dbName);
        return callback(null, _db);
    }
}

const getDb = () => {
    if (!_db) {
        throw Error("La base de données n'est pas connectée");
    }
    return _db;
};


module.exports = {
    getDb,
    initDb
};
