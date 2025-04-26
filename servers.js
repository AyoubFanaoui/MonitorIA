const app = require('./app');
const sequelize = require('./config/database');

require('dotenv').config();

// Importer les associations pour être sûr que les relations soient appliquées
require('./config/associations');
console.log('API Key:', process.env.OPENAI_API_KEY);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ alter: true }); // synchronisation
    console.log('Database synchronized.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
