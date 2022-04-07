const db = require("../db");

const getAllCitations = (req, res, next) => {
    let citations = [];
    try {
        db.getDb()
        .collection('citations')
        .find()
        .forEach(citation => {
            if(citation.content !== null){
                citations.push(citation);
            }
            
        })
        .then(result => {
            res.render('liste', {
                citations: citations,
                title: "Liste des citations", 
                layout: './layouts/full-width'
            });
            // res.status(201).json({citations});
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Impossible de trouver le contenu"
        })
    return next(error);
    }
}

exports.getAllCitations = getAllCitations;