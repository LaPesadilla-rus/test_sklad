
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

/*const otd_name2 = async  () =>{
    pool.query(`SELECT ot.ot_name, bl_otd_id, COUNT(bl.*) as otd 
                FROM balance bl
                
                inner join otd_spr ot
                on bl.bl_otd_id = ot.ot_id
                
                GROUP BY ot.ot_name, bl_otd_id `
    , (err,res)=>{
        var c =  {res: res.rows}
        console.log(c)
        //return(res.rows); 
        //return Promise.resolve(res.rows);
        return new Promise((resolve) => {
            setTimeout(() => resolve(res.rows), 100);
          });
    });
};
module.exports.otd_name2 = otd_name2;*/



exports.mol_name = function (cb) {
    pool.query(`SELECT mo.mo_name, bl.bl_mol_id, bl.bl_otd_id, mo_otd_id, COUNT(bl.*) as mol 
                FROM balance bl
                
                inner join mol_spr mo
                on bl.bl_mol_id = mo.mo_id

                GROUP BY mo.mo_name, bl.bl_otd_id, mo_otd_id, bl.bl_mol_id `
    , (err,res)=>{
        //console.log(res.rows)
        cb(err, res); 
    });
};

exports.all = function (cb) {
    pool.query(`SELECT *, (te.te_name || ' ' || ma.ma_name || ' '|| eq.eq_name || ' Инв. ном.: ' || bl_inv_num) as equip_name, mo.mo_otd_id as mol_otd, ot.ot_name, un.un_name  
                FROM balance bl

                inner join equip_spr eq
                on eq.eq_id = bl_eq_id
    
                inner join marka_equip_spr ma
                on ma.ma_id = eq.eq_mark_id
                
                inner join type_equip_spr te
                on te.te_id = eq_type_id

                inner join mol_spr mo
                on bl.bl_mol_id = mo.mo_id

                inner join otd_spr ot
                on bl.bl_otd_id = ot.ot_id

                inner join units_spr un
                on un.un_id = bl.bl_un_id

                ORDER BY equip_name
    `
    , (err,res)=>{
        cb(err, res); 
    });
};

exports.otd_data_otd = function (cb) {
    pool.query(`SELECT * FROM otd_spr`
    , (err,res)=>{
        //console.log(res.rows)
        cb(err, res); 
    });
};

exports.otd_data_mol = function (cb) {
    pool.query(`SELECT * FROM mol_spr`
    , (err,res)=>{
        //console.log(res.rows)
        cb(err, res); 
    });
};

exports.moveEQ = async function (data, cb) {
    var sql = `UPDATE public.balance SET bl_otd_id = `+data.otd_id+` `;
    if (data.mol_id){
        sql = sql + `, bl_mol_id = `+data.mol_id+``;
    }
    sql = sql + ` WHERE bl_id = `+data.bl_id+``;

    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
};

exports.moveEqLog = async function (data, cb) {
    //console.log(data);
    var sql = ` INSERT INTO public.equip_traff (et_user, et_mol_id1, et_otd_id1, et_mol_id2, et_otd_id2, et_bl_id, et_eq_id)
                VALUES ( '`+data.user+`', `+data.old_mol+`, `+data.old_otd+`, `+data.mol_id+`, `+data.otd_id+`, `+data.bl_id+`, `+data.eq_id+`);
     `;
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
}

exports.otd_data_otd1 = async() => {
    var docs = [];
    await pool.query('SELECT * FROM otd_spr ORDER BY ot_name')
        .then(
            (res) => {
                docs = res;
            }
        )
        .catch(function(err) {
            console.log(err)
        });
    return Promise.resolve(docs.rows);
}

exports.otd_data_mol1 = async(val) => {
    var docs;
    //docs = await pool.query('SELECT')
    await pool.query(`SELECT * FROM mol_spr WHERE mo_otd_id = `+val+` ORDER BY mo_name`).then ((res) =>{
        docs = res;
    }).catch( function(err) {
        console.log(err)
    });
    return Promise.resolve(docs.rows);
};

exports.otd_data_equip1 = async(mo_id, otd_id, reg) => {
    var docs;
    //docs = await pool.query('SELECT')
    var sql = `SELECT bl.*, (te.te_name || ' ' || ma.ma_name || ' '|| eq.eq_name || ' Инв. ном.: ' || bl_inv_num) as equip_name, mo_name as mol_name, ot_name as otd_name,
                un.un_name, eq.eq_kat_id, mo.mo_otd_id, ot_name, (te.te_name || ' ' || ma.ma_name || ' '|| eq.eq_name ) as equip_text, te_name
                FROM balance bl

                inner join mol_spr mo
                on mo.mo_id = bl.bl_mol_id


                inner join equip_spr eq
                on eq.eq_id = bl_eq_id

                inner join marka_equip_spr ma
                on ma.ma_id = eq.eq_mark_id
                
                inner join type_equip_spr te
                on te.te_id = eq_type_id  

                inner join otd_spr ot
                on bl.bl_otd_id = ot.ot_id

                inner join units_spr un
                on un.un_id = bl.bl_un_id
    `;
    if (reg === 'main'){
        sql = sql + ` WHERE bl_mol_id = `+mo_id+` AND bl_otd_id = `+otd_id+`
                      ORDER BY equip_name`;
        await pool.query(sql).then ((res) =>{
            docs = res;
        }).catch( function(err) {
            console.log(err)
        });
    }
    if (reg === 'out'){
        sql = sql + ` WHERE bl_mol_id = `+mo_id+` AND bl_otd_id <> `+otd_id+`
                    ORDER BY equip_name`;
        await pool.query(sql).then ((res) =>{
            docs = res;
        }).catch( function(err) {
            console.log(err)
        });
    }
    if (reg === 'otd'){
        sql = sql + `  WHERE bl.bl_otd_id = `+otd_id+` AND mo.mo_otd_id <> `+otd_id+`
                       ORDER BY equip_name`;
        await pool.query(sql).then((res) =>{
            docs = res;
        }).catch( function(err) {
            console.log(err)
        });
    }
    return Promise.resolve(docs.rows);
};

exports.spisatDocNum = async function (data, cb) {
    //console.log(data.act_id + ' act')
    var sql = `SELECT MAX(lb_act_num) FROM logbook WHERE lb_act_id = `+data.act_id+` `
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
}

exports.spisatInsert = async function (docNum,data, cb) {
    var sql = ` INSERT INTO public.logbook (lb_mol_name, lb_isp_name, lb_prim, lb_act_id, lb_act_num)
                VALUES ( '`+data.mol_name+`', '`+data.user+`', '`+data.prim+`', `+data.act_id+`, `+docNum+`);
     `;
    await pool.query(sql).then (
        (res) => {
            cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
}