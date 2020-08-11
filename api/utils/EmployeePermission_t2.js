const config = require("../config");
let jwt = require('jsonwebtoken');
let ResponseType1 = require("./ResponseType1");

function checkToken(req, res, next) {
    let token = req.headers['x-access-token'];
    jwt.verify(token, config.jwtTokenSecretKey, function (error, decoded) {
        if(error) {
            res.status(200);
            res.send(new ResponseType1(false, "Unauthorized access. Please Sign In"));
            return;
        }

        if(decoded.permissionType == 1 || decoded.permissionType == 2) {
            req.token = decoded;
            next();
        } else {
            res.status(200);
            res.send(new ResponseType1(false, "You are not authorized to do this operation."));
            return;
        }

    });
}

module.exports = checkToken;