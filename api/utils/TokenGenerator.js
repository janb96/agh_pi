const config = require("../config");
let jwt = require('jsonwebtoken');

function TokenGenerator(tokenData) {

    try {
        let token = jwt.sign(tokenData, config.jwtTokenSecretKey, {expiresIn: config.expiresIn});
        return {token: token};
    } catch(err) {
        return {token: "Something gone wrong ;("};
    }

}

module.exports = TokenGenerator;