
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
    console.log(jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTk0MDE4MDIyfQ.wPRBbWpwL0b2Uh43s0mjcn9QWo4gOPfWllJjQxcxT7Q'));
    res.send(token);
}