
const Auth = require('../models/auth.js');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

exports.login = async function(req, res) {
    console.log(req.body)
    await Auth.login(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    var user = {
        id: 0
    }
    const refreshToken = uuidv4();
    var token = {
        token: jwt.sign( {id: user.id }, config.secret),
        refreshToken,
    }
    console.log(jwt.decode(token.token));
    res.send(token);
}