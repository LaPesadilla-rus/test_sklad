const {Pool} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str_download);

exports.deleteAllBalance = async (cb) => {
    var  sql = `DELETE FROM balance WHERE bl_id > 0
    `; 
    await pool.query(sql).catch( (err) => {
        cb(err, '');
    })
    /*var  sql = `DELETE FROM otd_spr WHERE ot_id >= 0
    `; 
    await pool.query(sql).catch( (err) => {
        cb(err, '');
    })
    cb('','')*/
    /*var  sql = `DELETE FROM mol_spr WHERE mo_id >= 0
    `; 
    await pool.query(sql).catch( (err) => {
        cb(err, '');
    })*/
    cb('','')
}

exports.insertBalance = async (data,cb) => {
    var  sql = `INSERT INTO balance(bl_buh_name, bl_inv_num, bl_otd_id, bl_mol_id) VALUES ('`+data.buh_name+`', '`+data.inv_num+`', `+data.ot_id+`, `+data.mo_id+`)
    `; 
    await pool.query(sql).then( (res) => {
        cb('','')
    }).catch( (err) => {
        console.log(data)
        console.log(sql)
        cb(err,'')
    })
}

exports.otdNewInsert = async (data, cb) => {
    var  sql = `SELECT * FROM otd_spr WHERE ot_name LIKE '`+data.ot_name+`'
    `;
    var row = [];
    //console.log(sql) 
    await pool.query(sql).then( (res) => {
        row = res.rows;
        //console.log(res)
    }).catch( (err) => {
        cb(err,'')
    });
    if (row.length === 0){
        var  sql = `INSERT INTO otd_spr(ot_name) VALUES('`+data.ot_name+`')
        `;
        var row = []; 
        await pool.query(sql).catch( (err) => {
            cb(err,'')
        }).then( (res) => {
            cb('','')
        });
    }else{
        cb('',row[0].ot_id)
    }
}

exports.molNewInsert = async (data, cb) => {
    var  sql = `SELECT * FROM mol_spr WHERE mo_name LIKE '`+data.mo_name+`'
    `;
    var row = [];
    //console.log(sql) 
    await pool.query(sql).then( (res) => {
        row = res.rows;
        //console.log(res.rows)
    }).catch( (err) => {
        cb(err,'')
    });
    if (row.length === 0){
        var  sql = `INSERT INTO mol_spr(mo_name, mo_otd_id) VALUES('`+data.mo_name+`', `+data.ot_id+`)
        `;
        var row = []; 
        await pool.query(sql).catch( (err) => {
            cb(err,'')
        }).then( (res) => {
            cb('','')
        });
    }else{
        cb('',row[0].mo_id)
    }
}