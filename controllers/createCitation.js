const db = require("../db");
const { ObjectId } = require("mongodb");


const getAllTags = (req, res, next) => {
    let tags = [];
    try {
        db.getDb()
        .collection('tags')
        .find()
        .forEach(tag => {
            if(tag.label !== null){
                tags.push(tag);
            }
        })
        .then(result => {
            res.render('add',{ 
                tags: tags,               
                title: "Créer une citation", 
                layout: './layouts/mid-width'
            });
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Impossible de trouver le contenu"
        })
        return next(error);
    }
}

const createCitation = async (req, res, next) => {
    let citation = req.body;
    let tags = citation.tags;
    let tags_id = [];
    //TODO Verification avant insertion
    
    //Verification si les tags existent
    if(tags.length > 0){
        try{
            tags_id = await finTagDb(tags);
        }catch(error){
            res.status(500).json({
                success: false,
                message : "Impossible de créer le contenu"
            })
            return next(error);
        }
    }
    
    try{
        db.getDb()
        .collection('citations')
        .insertOne({        
            content: citation.content,
            author: citation.author,
            tags: tags_id
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(202).json({error : err});
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Impossible de créer le contenu"
        })
        return next(error);
    }
}

const finTagDb = async (tags) => {
    let tags_id = [];
    for (let i = 0; i < tags.length; i++) {
        const element = tags[i];
        const element_bdd = await db.getDb().collection('tags').find({label: `${element.toLowerCase()}`}).toArray();
        if(element_bdd.length > 0){
            const element_add = await db.getDb().collection('tags').insertOne({label : element.toLowerCase()});
            tags_id.push(element_add.insertedId.toString());
        }else{
            tags_id.push(element_bdd[0]._id.toString());
        }
    }
    console.log("TAGSS: " + tags_id);
    return tags_id;
}

exports.createCitation = createCitation;
exports.getAllTags = getAllTags;