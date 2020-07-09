
const Auth = require('../models/auth.js');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

exports.login = async function(req, res) {
    //console.log(req.body)
    let data = {}
    await Auth.login(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //console.log(docs.rows[0])
        data = docs.rows[0];
    });
    if (data.us_id !== ''){
        //user.id = data.us_id;
        const refreshToken = uuidv4();
        var out_data = {
            token: jwt.sign( {id: data.us_id }, config.secret),
            refreshToken,
            user: data.us_id,
            us_name: data.us_name,
        }
        await Auth.loginRT(out_data.refreshToken, out_data.user,function(err,docs){
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
        //console.log(jwt.decode(out_data.token));
        //.log(jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTk0MDE4MDIyfQ.wPRBbWpwL0b2Uh43s0mjcn9QWo4gOPfWllJjQxcxT7Q'));
        res.send(out_data);
    }else{
        res.sendStatus(500);
    }   
}

exports.checkRt = async function(req, res){
    //console.log(req)
    await Auth.checkRt(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //console.log(docs.rows[0])
        //data = docs.rows[0];
    });
}

exports.authOut = async function(req, res){
    //console.log('OUT')
    await Auth.loginRT('', req.headers.us_id ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
}