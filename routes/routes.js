const express = require('express');
const router = express.Router();

const getAllCitations = require('../controllers/getAllCitations');
const createCitation = require('../controllers/createCitation');
const updateCitation = require('../controllers/updateCitation');
const deleteCitation = require('../controllers/deleteCitation');

router.get('/', getAllCitations.getAllCitations);

router.post('/create', createCitation.createCitation);
router.get('/create', (req, res) => {
    res.render('add',{                
        title: "Créer une citation", 
        layout: './layouts/mid-width'
    });
});

router.post('/update/:id', updateCitation.updateCitation);
router.get('/update/:id', updateCitation.getCitationById);

router.get('/delete/:id', deleteCitation.deleteCitation);//A modifier et mettre correctement les méthodes
module.exports = router;