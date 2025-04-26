const DomaineApprentissage = require('../models/DomaineApprentissage');

// Créer un domaine
exports.createDomaine = async (req, res) => {
  try {
    const domaine = await DomaineApprentissage.create(req.body);
    res.status(201).json({
      message: 'Domaine créé avec succès',
      domaine
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Erreur lors de la création du domaine",
      error: error.message 
    });
  }
};

// Obtenir tous les domaines d'un utilisateur
exports.getDomainApprentissagesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const domaines = await DomaineApprentissage.findAll({ where: { userId } });
    res.status(200).json(domaines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des domaines de l'utilisateur." });
  }
};
