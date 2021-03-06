const express = require('express');
const router = express.Router();
const { body, validationResult  } = require("express-validator");


const getAllCitations = require('../controllers/getAllCitations');
const createCitation = require('../controllers/createCitation');
const updateCitation = require('../controllers/updateCitation');
const deleteCitation = require('../controllers/deleteCitation');
const searchCitation = require('../controllers/searchCitation');

//WEB
router.get('/citation/update/:id', updateCitation.getCitationById);
router.get('/citation/create', createCitation.getAllTags);
router.get('/citation/search', searchCitation.searchCitation);

//API
router.get('/', getAllCitations.getAllCitations);
router.post('/api/citation/create', createCitation.createCitation);
router.post('/api/citation/update/:id', updateCitation.updateCitation);
router.get('/api/citation/delete/:id', deleteCitation.deleteCitation);

module.exports = router;