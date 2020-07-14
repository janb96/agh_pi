var Sequelize = require('sequelize');
var sequelize = new Sequelize('agh_pi', 'agh_j', '1234', {
    host: '10.0.40.25',
    port: '5001',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;