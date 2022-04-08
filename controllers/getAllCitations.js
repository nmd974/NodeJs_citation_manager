const { ObjectId } = require("mongodb");
const db = require("../db");

const getAllCitations = async (req, res, next) => {
    let citations = [];
    try {
        const values = await db.getDb().collection('citations').find().toArray();
        if(values.length > 0){
            for (let i = 0; i < values.length; i++) {
                const element = values[i];
                const tags_values = element.tags;
                if(element.content !== null){
                    if(element.tags.length > 0){
                        const tmp = await getTagById(tags_values);
                        element.tags = tmp.join(", ");
                    }else{
                        element.tags = "";
                    }
                    citations.push(element);
                }
            }
        }
        res.render('liste', {
            citations: citations,
            title: "Liste des citations", 
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

exports.getAllCitations = getAllCitations;




// db.getDb()
// .collection('citations')
// .aggregate([
    //     { 
        //         $project: { 
            //             "_id" : 1, 
            //             "content" : 1, 
            //             "tags" : {
//                 "input" : "$tags", "as" : "t", "in" : "$$t.tag_id"
//             } 
//         }
//     }
//  ])
//  .forEach(citation => {
    //     if(citation.content !== null){
        //         citations.push(citation);
        //     }
        // })
        // .then(result => {
            //     console.log(result);
            //     res.render('liste', {
                //         citations: citations,
//         title: "Liste des citations", 
//         layout: './layouts/mid-width'
//     });
// });







                
                        // db.getDb().collection('citations').find().forEach(async citation => {
                        //     const tags_values = citation.tags;
                        //     if(citation.content !== null){
                        //         if(citation.tags.length > 0){
                        //             citation.tags = await getTagById(tags_values);
                        //         }else{
                        //             citation.tags = "";
                        //         }
                        //         citations.push(citation);
                        //     }
                        // })
                        // .then(result => {
                        //     console.log(citations);
                        //     res.render('liste', {
                        //         citations: citations,
                        //         title: "Liste des citations", 
                        //         layout: './layouts/mid-width'
                        //     });
                        // })
                        // .catch(err => {
                        //     console.log(err);
                        // });