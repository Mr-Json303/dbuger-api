const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');


module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        const error = new Error("No Authorization code");
        error.statusCode = 401;
        throw error;
    }

    // identified header
    const token = authHeader.split(' ')[1];

    let verifyToken;
    try {
        verifyToken = jwt.verify(token, authConfig.secret);
        req.loggedUser = verifyToken;
    } catch (error) {
        error.statusCode = 401;
        throw error;

    }

    next();

}