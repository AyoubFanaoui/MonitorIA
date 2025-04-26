const User = require('../models/User');
const DomaineApprentissage = require('../models/DomaineApprentissage');

User.hasMany(DomaineApprentissage, { foreignKey: 'userId' });
DomaineApprentissage.belongsTo(User, { foreignKey: 'userId' });
