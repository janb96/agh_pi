var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Products = sequelize.define('Products', {
    productID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Categories',
            key: 'categoryID'
        }
    },
    productName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    productDescription: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    productPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    productImageUrl: {
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
    isRecommended: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Products;