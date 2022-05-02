const createQuotesSchema = async (db) => {
    await db.getDb().createCollection('quotes', {
        validator : {
            $jsonSchema : {
                bsonType : "object",
                title : "quotes",
                additionalProperties : true,
                required : ["_id", "content", "author", "createdAt"],
                properties : {
                    _id :  {
                        bsonType: "objectId",
                    },
                    content :  {
                        bsonType: "string",
                        maxLength : 500,
                        minLength : 10,
                        description : "Doît être une chaîne de 10 à 500 caractères maximum et est obligatoire"
                    },
                    author :  {
                        bsonType: "string",
                        maxLength : 100,
                        minLength : 2,
                        description : "Doît être une chaîne de 2 à 100 caractères maximum et est obligatoire"
                    },
                    tags : {
                        bsonType: "array",
                        maxItems : 30,
                        description : "Doît être un tableau de 30 éléments maximum",
                        items : {
                            bsonType : "string",
                            description : "Doît être une chaîne de caractères"
                        }
                    },
                    createdAt : {
                        bsonType : "date",
                        description : "Doît être une date et est obligatoire"
                    }
                },
                validationLevel: "strict",
                validationAction: "error",
            }
        }
    });
    console.log("Quotes collection created");

    await db.getDb().collection('quotes').createIndex({createdAt : 1});
    console.log('Quotes collection indexed');
}

const createTagsSchema = async (db) => {
    await db.getDb().createCollection('tags', {
        validator : {
            $jsonSchema : {
                bsonType : "object",
                title : "tags",
                additionalProperties : true,
                required : ["_id", "label", "createdAt"],
                properties : {
                    _id :  {
                        bsonType: "objectId",
                    },
                    label :  {
                        bsonType: "string",
                        description : "Doît être une chaîne de caractères et est obligatoire"
                    },
                    quotes : {
                        bsonType: "array",
                        description : "Doît être un tableau de 30 éléments maximum",
                        items : {
                            bsonType : "string",
                            description : "Doît être une chaîne de caractères"
                        }
                    },
                    createdAt : {
                        bsonType : "date",
                        description : "Doît être une date et est obligatoire"
                    }
                },
                validationLevel: "strict",
                validationAction: "error",
            }
        }
    });
    console.log("Tags collection created");

    await db.getDb().collection('tags').createIndex({createdAt : 1});
    console.log('Tags collection indexed');
}

module.exports = {
    createQuotesSchema,
    createTagsSchema
};