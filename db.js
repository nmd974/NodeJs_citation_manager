const MongoClient = require('mongodb').MongoClient;

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c7wsf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const dbName = process.env.DB_NAME;
const schemas = require('./schemas');
let _db;

const initDb = callback => {

    if (_db) {
        console.log("La base de donnée est déjà connectée");
        return callback(null, _db);
    }

    MongoClient.connect(url, connected);
    async function connected(err, db) {
        if (err) {
            return callback(err);
        }
        console.log("Base de donnée connectée");
        _db = await db.db(dbName);
        // _db = await db.db(dbName);

        // await schemas.createQuotesSchema(_db);
        // await schemas.createTagsSchema(_db);
        
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
