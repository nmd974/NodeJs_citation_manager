const express = require('express');
const router = express.Router();

const getAllCitations = require('../controllers/getAllCitations');
const createCitation = require('../controllers/createCitation');
const updateCitation = require('../controllers/updateCitation');
const deleteCitation = require('../controllers/deleteCitation');

//WEB
router.get('/citation/update/:id', updateCitation.getCitationById);
router.get('/citation/create', createCitation.getAllTags);

//API
router.get('/', getAllCitations.getAllCitations);
router.post('/api/citation/create', createCitation.createCitation);
router.post('/api/citation/update/:id', updateCitation.updateCitation);
router.get('/api/citation/delete/:id', deleteCitation.deleteCitation);

module.exports = router;