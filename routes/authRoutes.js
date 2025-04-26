const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');  // Vérifie que ce chemin est correct

// Vérifie que tu appelles bien les méthodes du contrôleur
router.post('/signup', authController.signup);  // Assure-toi que la méthode signup est exportée correctement
router.post('/login', authController.login);  // Assure-toi que la méthode login est exportée correctement

module.exports = router;
