const db = require("../db");
const { ObjectId } = require("mongodb");
let tags_select = [];

const getAllTags = async () => {
    let tags = [];
    try {
        const values = await db.getDb().collection('tags').find().toArray();
        if(values.length > 0){
            for (let i = 0; i < values.length; i++) {
                const element = values[i];
                if(element.label !== null){
                    tags.push(element);
                }
            }
        }
        return tags;
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

const updateCitation = async (req, res, next) => {
    let citation = req.body;
    let tags = citation.tags;
    let tags_id = [];
    const id = new ObjectId(req.params.id);
    //TODO Verification avant insertion
    
    //Verification si les tags existent
    if(tags.length > 0){
        try{
            tags_id = await findTagDb(tags);
        }catch(error){
            res.status(500).json({
                success: false,
                message : "Impossible de modifier le contenu"
            })
            return next(error);
        }
    }
    
    try{
        db.getDb()
        .collection('citations')
        .updateOne({_id: id}, {$set:{
            content: citation.content,
            author: citation.author,
            tags: tags_id
        }})
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(202).json({error : err});
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Impossible de modifier le contenu"
        })
        return next(error);
    }
}

const getCitationById = async (req, res, next) => {
    let citations = [];
    let tags_selected = [];
    const id = ObjectId(req.params.id);
    try {
        const values = await db.getDb().collection('citations').find({_id: id}).toArray();
        if(values.length > 0){
            for (let i = 0; i < values.length; i++) {
                const element = values[i];
                const tags_values = element.tags;
                if(element.content !== null){
                    if(element.tags.length > 0){
                        tags_selected = await getTagById(tags_values);
                        element.tags = tags_selected.join(", ");
                    }else{
                        element.tags = "";
                    }
                    citations.push(element);
                }
            }
        }
        const tags_select = await getAllTags();
        res.render('update', {
            citation: citations,
            tags : tags_select,
            tags_selected : tags_selected,
            title: "Modifier une citation", 
            layout: './layouts/mid-width'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Impossible de trouver le contenu"
        })
        return next(error);
    }
}

const findTagDb = async (tags) => {
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
    return tags_id;
}

const getTagById = async (ids) => {
    let tag_name = [];
    let tags_id = [];
    ids.forEach(id => {
        tags_id.push(new ObjectId(id));
    })
    const tags_values = await db.getDb().collection('tags').find({_id : {$in : tags_id}}).project({_id:0, label:1}).toArray();
    if(tags_values.length > 0){
        for (let i = 0; i < tags_values.length; i++) {
            const element = tags_values[i];
            tag_name.push(element.label);
        }
    }
    return tag_name;
}

exports.updateCitation = updateCitation;
exports.getCitationById = getCitationById;


// const updateCitation =(req, res, next) => {
//     let citation = req.body;
//     const id = ObjectId(req.params.id);

//     try{
//         db.getDb()
//         .collection('citations')
//         .updateOne({_id: id}, {$set:{
//             content: citation.content,
//             author: citation.author,
//         }})
//         .then(result => {
//             res.redirect('/api/citations');
//         })
//         .catch(err => {
//             res.status(202).json({error : err});
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message : "Impossible de modifier le contenu"
//         })
//     return next(error);
//     }
// }