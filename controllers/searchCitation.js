const { ObjectId } = require("mongodb");
const db = require("../db");

const searchCitation = async (req, res, next) => {
    // let citations = [];
    /**
     * Rechercher dans la collection quotes via le content en regex selon ce qui est saisi
     * Stocker les ids recu dans un tableau
     * Requeter la collection tags via label et sortir les ids de quotes qui ne sont pas dans le tableau id temp
     * Puis retourner le tout
     */
    try {
        const citations = await db.getDb().collection('citations').aggregate([
            {
                $addFields : {
                    tags : {
                        $map : {
                            input : "$tags",
                            in : { $toObjectId : "$$this"}
                        }
                    }
                }
            },
            {
                $lookup : {
                    from : 'tags',
                    localField : "tags",
                    foreignField : "_id",
                    as : "output"
                }
            },
            { $unwind : "$output" }, //TODO Ca me retourne qu'un seul résultat et pas le tableau d'id
        ]).toArray();
        console.log(citations);
        res.render('search', {
            citations: citations,
            title: "Résultats de la recherche", 
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

exports.searchCitation = searchCitation;