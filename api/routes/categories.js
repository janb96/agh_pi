var express = require('express');
var router = express.Router();

//MODELS
let categories = require('../models/Categories');

//UTILS
let ResponseType1 = require('../utils/ResponseType1');
let EmployeePermission_t1 = require('../utils/EmployeePermission_t1');

router.get('/', function(req, res, next) {

    categories.findAll().then(
        result => {
            res.send(new ResponseType1(true, result));
        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            console.log(err);
        }
    );

});

router.post('/', EmployeePermission_t1, function(req, res, next) {

    const categoryName = req.body.categoryName;
    const categoryDescription = req.body.categoryDescription;
    const categoryImageUrl = req.body.categoryImageUrl;
    const isVisible = req.body.isVisible;

    if(!categoryName || !categoryDescription || !categoryImageUrl || !isVisible) {
        res.send(new ResponseType1(false, "The entered data is incorrect"));
        return;
    }

    const category = {
        categoryName: categoryName,
        categoryDescription: categoryDescription,
        categoryImageUrl: categoryImageUrl,
        isVisible: isVisible
    };

    categories.findOne({
        where: {
            categoryName: categoryName
        }
    }).then(
        result => {
            if(result) {
                res.send(new ResponseType1(false, "Category with this name already exist"));
                return;
            }
        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            console.log(err);
            return;
        }
    );

    categories.create(category).then(
        result => {
            res.send(new ResponseType1(true, result));
        }
    ).catch(
        err => {
            res.send(new ResponseType1(false, "Something gone wrong ;("));
            console.log(err);
        }
    );

});

router.put('/', EmployeePermission_t1, function(req, res, next) {

    const categoryID = req.body.categoryID;
    const categoryName = req.body.categoryName;
    const categoryDescription = req.body.categoryDescription;
    const categoryImageUrl = req.body.categoryImageUrl;
    const isVisible = req.body.isVisible;

    if(!categoryID || !categoryName || !categoryDescription || !categoryImageUrl) {
        res.send(new ResponseType1(false, "The entered data is incorrect"));
        return;
    }

    if(!Number.isInteger(categoryID)) {
        res.send(new ResponseType1(false, "The entered categoryID is incorrect"));
        return;
    }

    const category = {
        categoryName: categoryName,
        categoryDescription: categoryDescription,
        categoryImageUrl: categoryImageUrl,
        isVisible: isVisible
    };

    categories.update(category, {
            where: {
                categoryID: categoryID
            }
        }
        ).then(
            result => {
                console.log(result);
                res.send(new ResponseType1(true, "Record successfully changed"));
            }
    ).catch(
        err => {
            console.log(err);
            res.send(new ResponseType1(false, "Something gone wrong ;("));
        }
    );

});

module.exports = router;
