const {Pool/*, Client*/} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.postupl = function(data, cb) {

    let sql = `SELECT * FROM storage_in  `;

    sql = sql + ` ORDER BY si_id`;
    pool.query(sql
    , (err,res)=>{
        cb(err,res);
    });
}