const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');

// Route pour générer un challenge
router.post('/generate', challengeController.generateChallenge);

// Route pour obtenir le contenu d'un challenge par ID
router.get('/:challengeId/content', challengeController.getChallengeContent);

module.exports = router;
