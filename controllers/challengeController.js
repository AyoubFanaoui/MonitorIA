const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Challenge = require('../models/Challenge');
const DomainApprentissage = require('../models/DomaineApprentissage');

// Remplace par ta clé API DeepSeek
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;


// Fonction pour obtenir le contenu du fichier du challenge
exports.getChallengeContent = async (req, res) => {
    const { challengeId } = req.params;  // Récupérer l'ID du challenge depuis les paramètres de la requête
  
    try {
      // Trouver le challenge dans la base de données
      const challenge = await Challenge.findByPk(challengeId);
      if (!challenge) {
        return res.status(404).json({ message: "Challenge non trouvé" });
      }
  
      // Lire le contenu du fichier
      const filePath = challenge.filePath;
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Fichier non trouvé" });
      }
  
      // Lire le fichier de manière synchrone
      const content = fs.readFileSync(filePath, 'utf8');
  
      // Retourner le contenu du fichier dans la réponse
      res.status(200).json({ content });
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier :", error);
      res.status(500).json({ message: "Erreur interne lors de la récupération du contenu du fichier.", error: error.message });
    }
  };


exports.generateChallenge = async (req, res) => {
  const { level, domainId, userId } = req.body;

  try {
    // Trouver le domaine d'apprentissage
    const domain = await DomainApprentissage.findByPk(domainId);
    if (!domain) {
      return res.status(404).json({ message: "Domaine non trouvé" });
    }

    // Créer un prompt pour générer le cours avec DeepSeek
    const prompt = `Génère un petit cours sur le domaine ${domain.nom} pour un niveau ${level}, avec un exercice à la fin.`;

    // Effectuer la requête à l'API DeepSeek
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-r1-distill-qwen-32b:free',
        messages: [
          { role: "user", content: prompt }
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    // Log pour vérifier la réponse de l'API
    console.log('Réponse complète de l\'API:', response.data);

    // Vérifier si 'choices' existe et contient des éléments avant d'accéder à 'text'
    if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
      const content = response.data.choices[0].message.content.trim();  // Accès à 'content'

      // Créer un dossier pour l'utilisateur et le domaine s'il n'existe pas
      const dirPath = path.join(__dirname, `../files/${userId}/${domain.nom}`);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Enregistrer le fichier généré
      const filePath = path.join(dirPath, 'cours_et_exercice.txt');
      fs.writeFileSync(filePath, content);

      // Enregistrer dans la base de données
      const challenge = await Challenge.create({
        title: `Challenge: ${domain.nom}`,
        content,
        level,
        filePath: filePath,
        userId,
        domainId
      });

      res.status(201).json({
        message: "Challenge créé avec succès.",
        challenge
      });
    } else {
      res.status(400).json({ message: "Réponse inattendue de l'API", error: response.data });
    }

  } catch (error) {
    console.error("Erreur lors de la génération du challenge:", error);

    // Vérifier si la réponse contient des informations détaillées
    if (error.response) {
      res.status(400).json({
        message: "Erreur avec la requête à l'API DeepSeek.",
        error: error.response.data || error.response.statusText
      });
    } else {
      res.status(500).json({ message: "Erreur interne lors de la génération du challenge.", error: error.message });
    }
  }
};
