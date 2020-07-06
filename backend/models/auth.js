const {Pool/*, Client*/} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.login = async(data,cb) => {
    var sql = '';
    sql = `SELECT * FROM users WHERE us_login = '`+data.login+`' AND us_pas = '`+data.password+`'`;
    console.log(sql)
    await pool.query(sql).then (
        (res) => {
            console.log(res.data)
            cb('',res);
        }
    ).catch(function(err) {
        console.log(err)
        cb(err,'');
    });
};