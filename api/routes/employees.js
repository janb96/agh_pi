var express = require('express');
var router = express.Router();
let emailValidator = require("email-validator");
let Sha256Handler = require("../utils/Sha256Handler");
let BcryptHandler = require("../utils/BcryptHandler");
let TokenGenerator = require("../utils/TokenGenerator");
let jwt = require('jsonwebtoken');
const config = require("../config");

//MODELS
let employees = require('../models/Employees');

//UTILS
let ResponseType1 = require('../utils/ResponseType1');
let EmployeePermission_t1 = require('../utils/EmployeePermission_t1');

router.post('/', EmployeePermission_t1, async function(req, res, next) {

    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let password = req.body.password;
    let isActive = req.body.isActive;
    let permissionType = req.body.permissionType;

    //STEP 1 - VALIDATE EMAIL
    if(!emailValidator.validate(email)) {
        res.status(200);
        res.send(new ResponseType1(false, "Email is incorrect"));
        return;
    }

    //STEP 2 - SHA256 EMAIL
    let sha256Handler = new Sha256Handler();
    let emailSha256 = sha256Handler.makeHash(email);

    //STEP 3 - IS EMPLOYEE IN DATABASE?
    try {
        let dbEmployee = await employees.findOne({
            where: {
                emailHash: emailSha256
            }
        });
        if(dbEmployee) {
            res.status(200);
            res.send(new ResponseType1(false, "Account with this email already exist"));
            return;
        }
    } catch(err) {
        res.status(200);
        res.send(new ResponseType1(false, "Something gone wrong ;("));
        return;
    }

    //STEP 4 - BCRYPT PASSWORD
    let bcryptHandler = new BcryptHandler();
    let hashPassword = await bcryptHandler.hashPassword(password);

    const employee = {
        emailHash: emailSha256,
        password: hashPassword,
        employeeName: name,
        employeeSurname: surname,
        isActive: isActive,
        permissionType: permissionType
    };

    try {
        await employees.create(employee);
    } catch(err) {
        res.status(200);
        res.send(new ResponseType1(false, "Something gone wrong ;("));
        return;
    }

    res.send(new ResponseType1(true, "Employee created"));

});

router.post('/authenticate', async function(req, res, next) {

    let email = req.body.email;
    let password = req.body.password;

    //STEP 1 - VALIDATE EMAIL
    if(!emailValidator.validate(email)) {
        res.status(200);
        res.send(new ResponseType1(false, "Email is incorrect"));
        return;
    }

    //STEP 2 - SHA256 EMAIL
    let sha256Handler = new Sha256Handler();
    let emailSha256 = sha256Handler.makeHash(email);

    //STEP 3 - IS EMPLOYEE IN DATABASE?
    try {
        let dbEmployee = await employees.findOne({
            where: {
                emailHash: emailSha256
            }
        });
        if(!dbEmployee) {
            res.status(200);
            res.send(new ResponseType1(false, "There is no employee with this email"));
            return;
        }

        //STEP 4 - COMPARE PASSWORDS
        let bcryptHandler = new BcryptHandler();
        let checkPassword = await bcryptHandler.checkPassword(password, dbEmployee.dataValues.password);

        if(!checkPassword) {
            res.status(200);
            res.send(new ResponseType1(false, "Wrong password"));
            return;
        }

        const tokenData = {
            employeeID: dbEmployee.dataValues.employeeID,
            employeeName: dbEmployee.dataValues.employeeName,
            employeeSurname: dbEmployee.dataValues.employeeSurname,
            permissionType: dbEmployee.dataValues.permissionType
        };

        res.status(200);
        res.send(new ResponseType1(true, TokenGenerator(tokenData)));

    } catch(err) {
        res.status(200);
        res.send(new ResponseType1(false, "Something gone wrong ;("));
        return;
    }


});

router.get('/checkEmployeeToken', async function(req, res, next) {

    let token = req.headers['x-access-token'];

    jwt.verify(token, config.jwtTokenSecretKey, function (error, decoded) {
        if(error) {
            res.status(200);
            res.send(new ResponseType1(false, "Invalid token"));
            return;
        }
        res.send(new ResponseType1(true, decoded));
    });

});

module.exports = router;
