
const Auth = require('../models/auth.js');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

exports.login = async function(req, res) {
    let data = {}
    let status = false;
    await Auth.login(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        //console.log(docs.rows)
        data = docs.rows[0];
        if (docs.rows.length > 0){
            status = true;
        }
        
    });
    if (status){
        //console.log(data.us_id)
        const refreshToken = uuidv4();
        var out_data = {
            token: jwt.sign( {id: data.us_id }, config.secret),
            refreshToken,
            user: data.us_id,
            us_name: data.us_name,
            role: data.us_role,
        }
        await Auth.loginRT(out_data.refreshToken, out_data.user,function(err,docs){
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }
        });
        //console.log(jwt.decode(out_data.token));
        //.log(jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTk0MDE4MDIyfQ.wPRBbWpwL0b2Uh43s0mjcn9QWo4gOPfWllJjQxcxT7Q'));
        res.send(out_data);
        console.log(data.us_login + ' авторизован')
    }else{
        res.sendStatus(403);
    }
    
      
}

exports.checkRt = async function(req, res){
    await Auth.checkRt(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
    });
}

exports.logCheck = async function(req, res){
    await Auth.logCheck(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (docs.rows[0].us_rt){
            if (docs.rows[0].us_rt === req.body.data.rt){
                res.sendStatus(200);
            }else{
                res.send('err');
            }
        }else{
            res.send('err');
        }
    });
}

exports.authOut = async function(req, res){
    if (req.headers.rt !== ''){
        await Auth.loginRT('', req.headers.us_id ,function(err,docs){
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log(req.headers.us_id + ' вышел')
            res.sendStatus(200)
        });
    }   
}

exports.access = async function(req, res){
    await Auth.access(req.headers.us_id ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        let role = { role: docs.rows[0].us_role};
        res.send(role)
    });
}