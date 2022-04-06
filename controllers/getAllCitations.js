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
            console.log(citations[0].content);
            res.render('liste', {
                citations: citations
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