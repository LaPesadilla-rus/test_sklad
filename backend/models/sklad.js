
const {Pool} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.all = function (cb) {
    pool.query(`SELECT st.st_id, st.st_amount, st.st_prim, te.te_name, eq.eq_name, pr.pr_name, st.st_inv_num, kat.kat_name,
                    un.un_name, to_char(st.st_inp_date, 'DD.MM.YYYY')
                    
                    FROM storage st
                    
                    inner join equip_spr eq
                    on eq.eq_id = st.st_eq_id

                    inner join type_equip_spr te
					on te.te_id = eq.eq_id
                    
                    inner join provider_spr pr
                    on pr.pr_id = st.st_pr_id
                    
                    inner join kategor_spr kat
                    on kat.kat_id = eq.eq_kat_id
                    
                    inner join units_spr un
                    on un.un_id = st.st_un_id

                    order by st.st_id 
                `
    , (err,res)=>{
        cb(err, res); 
    });
};

exports.provider = function (cb) {
    pool.query(`SELECT * FROM provider_spr ORDER BY pr_name`
    , (err,res)=>{
       cb(err,res);
    });
}

exports.marka = function (cb) {
    pool.query(`SELECT ma_id as id, ma_name as name FROM marka_equip_spr ORDER BY ma_name`
    , (err,res)=>{
        cb(err,res);
    }); 
}

exports.units = function(cb) {
    pool.query(`SELECT * FROM units_spr`
    , (err,res)=>{
        cb(err, res);
    }); 
}

exports.type = function(cb) {
    pool.query(`SELECT * FROM type_equip_spr`
    , (err,res)=>{
        cb(err,res);
    });
}

exports.type_a = function(cb) {
    pool.query(`SELECT te_id as id, te_name as name FROM type_equip_spr`
    , (err,res)=>{
        cb(err,res);
    });
}

exports.type_post = function(id, cb) {
    pool.query(`SELECT te_id as id, te_name as name FROM type_equip_spr WHERE te_kat_id = `+id+` ORDER BY te_name`
    , (err,res)=>{
        cb(err,res);
    });
}

exports.kat = function(cb) {
    pool.query(`SELECT * FROM kategor_spr ORDER BY kat_id`
    , (err,res)=>{
        cb(err, res);
    }); 
}

exports.kat2 = function(cb) {
    pool.query(`SELECT kat_id as id, kat_name as name FROM kategor_spr ORDER BY kat_id`
    , (err,res)=>{
        cb(err, res);
    }); 
}

exports.equip_save = function(req,cb) {
    if(!req.body.data) return res.sendStatus(400);
    var sql = `INSERT INTO public.equip_spr (eq_kat_id, eq_mark_id, eq_type_id, eq_name)
    VALUES ( `+req.body.data.kat+`,`+req.body.data.marka+`,`+req.body.data.type+`,'`+req.body.data.name+`');`;
    console.log(sql); 
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            cb(err,'INSERT COMPLITE');
        }
    }); 
}

exports.sklad_save = function(req,cb) {
    if(!req.body.data) return res.sendStatus(400);
    /*let date = new Date();
    let dateNow = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();*/
    var sql = `INSERT INTO public.storage (st_eq_id, st_pr_id, st_un_id, st_inv_num, st_amount, st_contr_date, st_contr_num, st_inp_usr)
    VALUES ( `+req.body.data.equip_id+`,`+req.body.data.provider_id+`, `+req.body.data.units_id+` ,'`+req.body.data.inv_num+`',`+req.body.data.kol+`,'`+req.body.data.date+`',
    '`+req.body.data.dogvr_num+`', '`+req.body.data.user+`');`;
    //console.log(sql)
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            cb(err,'POST COMPLITE');
        }
    });
}