const db = require("../db");


const createCitation =(req, res, next) => {
    let citation = req.body;
    // console.log(req.body);
    try{
        db.getDb()
        .collection('citations')
        .insertOne({        
            content: citation.content,
            author: citation.author
        })
        .then(result => {
            res.redirect('/api/citations');
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

exports.createCitation = createCitation;