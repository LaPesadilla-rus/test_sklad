
const {Pool/*, Client*/} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.otd_name = function (cb) {
    pool.query(`SELECT ot.ot_name, bl_otd_id, COUNT(bl.*) as otd 
                FROM balance bl
                
                inner join otd_spr ot
                on bl.bl_otd_id = ot.ot_id
                
                GROUP BY ot.ot_name, bl_otd_id `
    , (err,res)=>{
        //console.log(res.rows)
        cb(err, res); 
    });
};

exports.mol_name = function (id,cb) {
    pool.query(`SELECT mo.mo_name, bl.bl_mol_id, bl.bl_otd_id, COUNT(bl.*) as mol 
                FROM balance bl
                
                inner join mol_spr mo
                on bl.bl_mol_id = mo.mo_id
                
                where bl.bl_otd_id = `+id+`

                GROUP BY mo.mo_name, bl.bl_otd_id, bl.bl_mol_id `
    , (err,res)=>{
        //console.log(res.rows)
        cb(err, res); 
    });
};

exports.all = function (cb) {
    pool.query(`SELECT * from balance `
    , (err,res)=>{
        cb(err, res); 
    });
};