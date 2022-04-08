const { ObjectId } = require("mongodb");
const db = require("../db");

const searchCitation = async (req, res, next) => {
    // let citations = [];
    try {
        const citations = await db.getDb().collection('citations').aggregate([
            {
                $lookup : {
                from : 'citations',
                let : {tags : "$tags"},
                pipeline : [
                    { $match : { $expr : { $in : [_id , "$$tags"]}}}
                ],
                as : "output"
                }
            }
        ]).toArray();
        console.log(citations);
        // const values = await db.getDb().collection('citations').find().toArray();
        // if(values.length > 0){
        //     for (let i = 0; i < values.length; i++) {
        //         const element = values[i];
        //         const tags_values = element.tags;
        //         if(element.content !== null){
        //             if(element.tags.length > 0){
        //                 const tmp = await getTagById(tags_values);
        //                 element.tags = tmp.join(", ");
        //             }else{
        //                 element.tags = "";
        //             }
        //             citations.push(element);
        //         }
        //     }
        // }
        // res.render('liste', {
        //     citations: citations,
        //     title: "Liste des citations", 
        //     layout: './layouts/mid-width'
        // });
    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Impossible de trouver le contenu"
        })
        return next(error);
    }
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
            tag_name.push(element.label.toUpperCase());
        }
    }
    return tag_name;
}

exports.searchCitation = searchCitation;