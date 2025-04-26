const express = require('express');
const router = express.Router();
const domaineApprentissageController = require('../controllers/domaineApprentissageController');

// Route pour créer un DomainApprentissage
router.post('/create', domaineApprentissageController.createDomaine);

// Route pour obtenir tous les DomainApprentissage d'un utilisateur
router.get('/:userId', domaineApprentissageController.getDomainApprentissagesByUser);

module.exports = router;
