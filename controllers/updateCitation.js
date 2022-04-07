const db = require("../db");
const { ObjectId } = require("mongodb");


const updateCitation =(req, res, next) => {
    let citation = req.body;
    const id = ObjectId(req.params.id);

    try{
        db.getDb()
        .collection('citations')
        .updateOne({_id: id}, {$set:{
            content: citation.content,
            author: citation.author,
        }})
        .then(result => {
            res.redirect('/api/citations');
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

const getCitationById = (req, res, next) => {
    let citations = [];
    const id = ObjectId(req.params.id);

    try{
        db.getDb()
        .collection('citations')
        .find({_id: id})
        .forEach(citation => {
            citations.push(citation);
        })
        .then(result => {
            res.render('update', {
                citation: citations,
                title: "Modifier une citation", 
                layout: './layouts/mid-width'
            });
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

exports.updateCitation = updateCitation;
exports.getCitationById = getCitationById;