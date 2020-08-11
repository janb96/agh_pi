var Sequelize = require('sequelize');
var sequelize = new Sequelize('agh_pi', 'agh_j', '1234', {
    host: 'localhost',
    port: '5001',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;