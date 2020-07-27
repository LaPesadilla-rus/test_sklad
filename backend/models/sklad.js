
const {Pool} = require('pg');
const conn = require('../db_con.js');
const pool = new Pool (conn.conn_str);

exports.all = function (cb) {
    pool.query(`SELECT st.st_id, st.st_amount, st.st_prim, te.te_name, eq.eq_name, pr.pr_name, st.st_inv_num, kat.kat_name,
                    un.un_name, to_char(st.st_inp_date, 'YYYY-MM-DD'), (te.te_name || ' ' || ma.ma_name || ' '|| eq.eq_name) as equip_name, st.*
                    
                    FROM storage st
                    
                    left outer join equip_spr eq
                    on eq.eq_id = st.st_eq_id

                    left outer join type_equip_spr te
                    on te.te_id = eq.eq_type_id
                    
                    left outer join marka_equip_spr ma
                    on ma.ma_id = eq.eq_mark_id
                    
                    left outer join provider_spr pr
                    on pr.pr_id = st.st_pr_id
                    
                    left outer join kategor_spr kat
                    on kat.kat_id = eq.eq_kat_id
                    
                    inner join units_spr un
                    on un.un_id = st.st_un_id

                    order by st.st_id desc
                `
    , (err,res)=>{
        cb(err, res); 
        //console.log(res.rows)
    });
};

exports.filterAll = function (data, cb) {
    //console.log(data)
    let sql = `SELECT st.st_id, st.st_amount, st.st_prim, te.te_name, eq.eq_name, pr.pr_name, st.st_inv_num, kat.kat_name,
                    un.un_name, to_char(st.st_inp_date, 'YYYY-MM-DD'), st.*, (te.te_name || ' ' || ma.ma_name || ' '|| eq.eq_name) as equip_name
                    
                    FROM storage st
                    
                    inner join equip_spr eq
                    on eq.eq_id = st.st_eq_id

                    inner join type_equip_spr te
                    on te.te_id = eq.eq_type_id
                    
                    inner join provider_spr pr
                    on pr.pr_id = st.st_pr_id
                    
                    inner join kategor_spr kat
                    on kat.kat_id = eq.eq_kat_id
                    
                    inner join units_spr un
                    on un.un_id = st.st_un_id

                    inner join marka_equip_spr ma
                    on ma.ma_id = eq.eq_mark_id
    `;
    let where = ``,
    a = 0;
    if (data.kat_id){
        where += ` kat.kat_id = `+data.kat_id+``;
        a++;
    }
    if (data.inv_txt){
        if ( a > 0){
            where += ` AND st_inv_num LIKE '%`+data.inv_txt+`%'`;
        }else{
            where += ` st_inv_num LIKE '%`+data.inv_txt+`%'`;
        }
        a++;
    }
    if (data.name){
        if (a > 0){
            where += ` AND eq_name LIKE '%`+data.name+`%'`
        }else{
            where += ` eq_name LIKE '%`+data.name+`%'`
        }
        a++;
    }
    if (a > 0){
        where = ` WHERE ` + where;
        sql += where;
    }
    sql += ` order by st.st_id desc`;
    //console.log(sql)
    pool.query(sql
    , (err,res)=>{
        cb(err, res); 
        //console.log(res.rows)
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
    var sql = `INSERT INTO public.storage (st_eq_id, st_pr_id, st_un_id, st_inv_num, st_amount, 
                                            st_contr_date, st_contr_num, st_usr_id, 
                                            st_buh_name, st_prim)
    VALUES ( `+req.body.data.equip_id+`,`+req.body.data.provider_id+`, `+req.body.data.units_id+` ,'`+req.body.data.inv_num+`',`+req.body.data.kol+`,
            '`+req.body.data.date+`', '`+req.body.data.dogvr_num+`', `+req.headers.us_id+`, 
            '`+req.body.data.buh_name+`', '`+req.body.data.prim+`');`;
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            cb(err,'POST COMPLITE');
        }
    });
}

exports.sklad_save_in = function(req,cb) {
    if(!req.body.data) return res.sendStatus(400);
    var sql = `INSERT INTO public.storage_in (si_eq_id, si_pr_id, si_un_id, si_inv_num, 
                                                si_amount, si_contr_date, si_contr_num, si_usr_id, 
                                                si_buh_name)
    VALUES ( `+req.body.data.equip_id+`,`+req.body.data.provider_id+`, `+req.body.data.units_id+` ,'`+req.body.data.inv_num+`',
                `+req.body.data.kol+`, '`+req.body.data.date+`', '`+req.body.data.dogvr_num+`', `+req.headers.us_id+`, 
                '`+req.body.data.buh_name+`');`;
    pool.query(sql
    , (err,res)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            cb(err,'POST COMPLITE');
        }
    });
}

exports.sklad_update = function(req,cb) {
    //console.log(req.body.data)
    if(!req.body.data) return res.sendStatus(400);
    var sql = `UPDATE public.storage 
                SET st_pr_id = `+req.body.data.provider_id+`, st_un_id=`+req.body.data.units_id+`, st_inv_num='`+req.body.data.inv_num+`', st_amount=`+req.body.data.kol+`,
                st_contr_date='`+req.body.data.date+`', st_contr_num='`+req.body.data.dogvr_num+`', st_usr_upd_id=`+req.headers.us_id+`, st_prim='`+req.body.data.prim+`',
                st_buh_name= '`+req.body.data.buh_name+`'
                WHERE st_id=`+req.body.data.st_id+`
                `
    //console.log(sql)
    pool.query(sql
    , (err,res)=>{
        cb(err,'POST COMPLITE');
    });
    
}

exports.sklad_out = function(req,cb) {
    if(!req.body.data) return res.sendStatus(400);
    var sql = '';
    var data = [];
    sql = `SELECT * FROM storage WHERE st_id = `+req.body.data.id_item+` AND st_amount >= `+req.body.data.kol+``;
    pool.query(sql
        , (err,res)=>{
            if (err) {
                console.log("Postgres INSERT error:", err);
            }else{
                data = res.rows[0];
               cb(err,data);
            }
    });

}

// ПОФИКСИТЬ ПЕРЕДАЧУ ID ПОЛЬЗОВАТЕЛЯ
exports.sklad_out_midl0 = async function(data, mol_id, otd_id, user, cb) {
    var sql = `INSERT INTO public.storage_out(
                    so_eq_id, so_pr_id, so_un_id, so_amount, so_inv_num, so_contr_num, so_mol_id, so_otd_id, so_usr_id, so_kat_id, so_buh_name)
                    VALUES (`+data.st_eq_id+`, `+data.st_pr_id+`, `+data.st_un_id+`, `+data.kol+`, '`+data.st_inv_num+`',
                    '`+data.st_contr_num+`', `+mol_id+`, `+otd_id+`, 0, `+data.eq_kat_id+`, '`+data.st_buh_name+`');`;
    //console.log(sql)
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        console.log(err)
        cb(err,'');
    });
}

exports.sklad_out_midl1 = async function(data, mol_id, otd_id,cb) {
    var sql = `INSERT INTO public.balance(
                    bl_eq_id, bl_pr_id, bl_un_id, bl_amount, bl_inv_num, bl_contr_num,  bl_inp_usr, bl_prim, bl_mol_id, bl_otd_id, bl_buh_name)
                    VALUES (`+data.st_eq_id+`, `+data.st_pr_id+`, `+data.st_un_id+`, `+data.kol+`, '`+data.st_inv_num+`',
                    '`+data.st_contr_num+`','`+data.st_inp_usr+`', '`+data.st_prim+`', `+mol_id+`, `+otd_id+`, '`+data.st_buh_name+`');`;
    //console.log(sql)
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        console.log(err)
        cb(err,'');
    });
}

exports.sklad_out_midl2 = async function(data,cb) {
    //var val = (a.st_amount - data.kol);
    sql = `UPDATE public.storage SET st_amount = st_amount - `+data.kol+` WHERE st_id = `+data.st_id+``;
    //console.log(sql)
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
}

exports.sklad_out_midl3 = async function(data,cb) {
    var sql = '';
    sql = `SELECT * FROM storage WHERE st_id = `+data.st_id+``;
    await pool.query(sql).then ((res) =>{
        //console.log(res.rows)
        docs = res;
    }).catch( function(err) {
        console.log(err)
    });
    return Promise.resolve(docs.rows);
}

exports.out_data_otd = async(cb) => {
    var sql = '';
    sql = `SELECT * FROM otd_spr ORDER BY ot_name`;
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
};
exports.out_data_mol = async(cb) => {
    var sql = '';
    sql = `SELECT * FROM mol_spr ORDER BY mo_name`;
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
};
exports.out_data_kat = async(cb) => {
    var sql = '';
    sql = `SELECT * FROM kategor_spr ORDER BY kat_name`;
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
};
exports.out_data_equip = async(cb) => {
    var sql = '';
    sql = `SELECT st.*, (te.te_name || ' ' || ma.ma_name || ' ' || eq.eq_name) as equip_name, un.un_name , eq.eq_kat_id
            FROM storage  st

            inner join equip_spr eq
            on eq.eq_id = st.st_eq_id

            inner join type_equip_spr te
            on te.te_id = eq.eq_type_id

            inner join marka_equip_spr ma
            on ma.ma_id = eq.eq_mark_id

            inner join units_spr un
            on un.un_id = st.st_un_id

            order by st.st_id
            `;
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
};