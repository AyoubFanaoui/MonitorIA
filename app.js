const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares (l'ordre est important)
app.use(cors());  // CORS en premier
app.use(express.json());  // Body parser ensuite

// Imports routes
const authRoutes = require('./routes/authRoutes');
const domainApprentissageRoutes = require('./routes/domaineApprentissageRoutes');
const challengeRoutes = require('./routes/challengeRoutes');

// Utiliser '/auth' comme préfixe pour toutes les routes d'authentification
app.use('/auth', authRoutes);  // Route préfixée par '/auth'
app.use('/domain-apprentissage', domainApprentissageRoutes);
app.use('/challenge', challengeRoutes);



// Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur MentorIA API');
});

// Middleware de 404 (doit venir après toutes les routes)
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint non trouvé" });
});

module.exports = app;
