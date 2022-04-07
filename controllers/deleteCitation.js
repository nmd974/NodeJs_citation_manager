const db = require("../db");
const { ObjectId } = require("mongodb");


const deleteCitation =(req, res, next) => {
    const id = ObjectId(req.params.id);

    try{
        db.getDb()
        .collection('citations')
        .deleteOne({_id: id})
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            res.status(202).json({error : err});
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Impossible de supprimer le contenu"
        })
    return next(error);
    }
}

exports.deleteCitation = deleteCitation;
