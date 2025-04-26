const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const DomainApprentissage = require("./DomaineApprentissage");

const Challenge = sequelize.define('Challenge', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  level: {
    type: DataTypes.ENUM('débutant', 'intermédiaire', 'avancé'),
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: true  // Le chemin du fichier généré sera stocké ici
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  domainId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'challenges',
  timestamps: true
});

// Association avec DomaineApprentissage
Challenge.belongsTo(DomainApprentissage, { foreignKey: 'domainId' });
DomainApprentissage.hasMany(Challenge, { foreignKey: 'domainId' });

module.exports = Challenge;
