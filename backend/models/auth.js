const {Pool/*, Client*/} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.login = async(data,cb) => {
    var sql = '';
    sql = `SELECT * FROM users WHERE us_login = '`+data.login+`' AND us_pas = '`+data.password+`'`;
    console.log(sql)
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
};

exports.loginRT = async(rt, id, cb) => {
    var sql = '';
    sql = `UPDATE users SET us_rt = '`+rt+`' WHERE us_id = `+id+``;
    console.log(sql)
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
};