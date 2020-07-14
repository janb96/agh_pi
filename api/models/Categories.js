var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Categories = sequelize.define('Categories', {
    categoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    categoryDescription: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    categoryImageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateOfCreation: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    isVisible: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
});

module.exports = Categories;