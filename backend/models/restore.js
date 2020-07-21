const {Pool} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str_download);

exports.deleteAllBalance = async (cb) => {
    var  sql = `DELETE FROM balance WHERE bl_id > 0
    `; 
    await pool.query(sql).catch( (err) => {
        cb(err, '');
    })
    var  sql = `DELETE FROM otd_spr WHERE ot_id >= 0
    `; 
    await pool.query(sql).catch( (err) => {
        cb(err, '');
    })
    var  sql = `DELETE FROM mol_spr WHERE mo_id >= 0
    `; 
    await pool.query(sql).catch( (err) => {
        cb(err, '');
    })
    cb('','')
}

exports.insertBalance = async (data,cb) => {
    var  sql = `INSERT INTO balance(bl_buh_name, bl_inv_num, bl_otd_id, bl_mol_id, bl_un_id, bl_amount) 
                VALUES ('`+data.buh_name+`', '`+data.inv_num+`', `+data.ot_id+`, `+data.mo_id+`, 0, 1)
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
    await pool.query(sql).then( (res) => {
        row = res.rows;
    }).catch( (err) => {
        cb(err,'')
    });
    if (row.length === 0){
        var  sql = `INSERT INTO otd_spr(ot_name) VALUES('`+data.ot_name+`')
        `;
        var row = []; 
        await pool.query(sql).catch( (err) => {
            cb(err,'')
        });
        var  sql = `SELECT * FROM otd_spr WHERE ot_name LIKE '`+data.ot_name+`'
        `;
        var row = [];
        await pool.query(sql).then( (res) => {
            row = res.rows;
        }).catch( (err) => {
            cb(err,'')
        });
        cb('', row[0].ot_id)
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
        });
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
        cb('', row[0].mo_id)
    }else{
        cb('',row[0].mo_id)
    }
}

exports.deleteAllStorage = async (cb) => {
    var  sql = `DELETE FROM storage WHERE st_id >= 0
    `; 
    await pool.query(sql).catch( (err) => {
        cb(err, '');
    })
    cb('','')
}

exports.insertStorage = async (data,cb) => {
    var  sql = `INSERT INTO storage(st_buh_name, st_inv_num, st_un_id, st_amount, st_prim, st_kat_id) 
                VALUES ('`+data.buh_name+`', '`+data.inv_num+`', `+data.un_id+`, `+data.amount+`, '`+data.prim+`', `+data.kat_id+`)
    `;
    //console.log(sql) 
    await pool.query(sql).then( (res) => {
        cb('','')
    }).catch( (err) => {
        console.log(data)
        console.log(sql)
        cb(err,'')
    })
}