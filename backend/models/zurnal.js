const {Pool/*, Client*/} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.postupl = function(data, cb) {
    //console.log(data)
    let wh = 0,
        sql_where = '';
    let sql = `SELECT si.*,to_char(si.si_date, 'DD.MM.YYYY') as si_date, to_char(si.si_contr_date, 'DD.MM.YYYY') as si_contr_date,
                (te.te_name || ' ' || ma.ma_name || ' '|| eq.eq_name) as equip_name, un_name, us.us_name
                FROM storage_in si  

                inner join equip_spr eq
                on eq.eq_id = si.si_eq_id

                inner join marka_equip_spr ma
                on ma.ma_id = eq.eq_mark_id
                
                inner join type_equip_spr te
                on te.te_id = eq_type_id

                inner join units_spr un
                on un.un_id = si.si_un_id

                inner join users us
                on us.us_id = si_usr_id
    `;
    if ( data.flDate1 !== ''){
        sql_where = sql_where + ` si_date >= '`+data.flDate1+`'`;
        wh++;
    }
    if (data.flDate2 !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND si_date <= '`+data.flDate2+`  23:59:59'`;
        }else{
            sql_where = sql_where + ` si_date <= '`+data.flDate2+`  23:59:59'`;
        }
        wh++;
    }
    if (data.flDate3 !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND si_contr_date >= '`+data.flDate3+`'`;
        }else{
            sql_where = sql_where + ` si_contr_date >= '`+data.flDate3+`'`;
        }
        wh++;
    }
    if (data.flDate4 !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND si_contr_date <= '`+data.flDate4+`  23:59:59'`;
        }else{
            sql_where = sql_where + ` si_contr_date <= '`+data.flDate4+`  23:59:59'`;
        }
        wh++;
    }
    if (data.invNum !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND si_inv_num LIKE '%`+data.invNum+`%'`;
        }else{
            sql_where = sql_where + ` si_inv_num LIKE '%`+data.invNum+`%'`;
        }
        wh++;
    }
    if (data.contrNum !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND si_contr_num LIKE '%`+data.contrNum+`%'`;
        }else{
            sql_where = sql_where + ` si_contr_num LIKE '%`+data.contrNum+`%'`;
        }
        wh++;
    }
    if(wh > 0){
        sql = sql + ' WHERE ' + sql_where;
    }
    sql = sql + ` ORDER BY si_id  desc`;
    //console.log(sql)
    pool.query(sql
    , (err,res)=>{
        cb(err,res);
    });
}

exports.vipiska = function(data, cb) {
    //console.log(data)
    let wh = 0,
        sql_where = '';
    let sql = `SELECT so.*,to_char(so.so_date, 'DD.MM.YYYY') as so_date, mo.mo_name, otd.ot_name,
                (te.te_name || ' ' || ma.ma_name || ' '|| eq.eq_name) as equip_name, un_name, us.us_name
                FROM storage_out so  

                inner join equip_spr eq
                on eq.eq_id = so.so_eq_id

                inner join marka_equip_spr ma
                on ma.ma_id = eq.eq_mark_id
                
                inner join type_equip_spr te
                on te.te_id = eq_type_id

                inner join units_spr un
                on un.un_id = so.so_un_id

                inner join users us
                on us.us_id = so_usr_id

                inner join mol_spr mo
                on mo.mo_id = so.so_mol_id

                inner join otd_spr otd
                on otd.ot_id = so.so_otd_id

    `;
    if ( data.flDate1 !== ''){
        sql_where = sql_where + ` so_date >= '`+data.flDate1+`'`;
        wh++;
    }
    if (data.flDate2 !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND so_date <= '`+data.flDate2+`  23:59:59'`;
        }else{
            sql_where = sql_where + ` so_date <= '`+data.flDate2+`  23:59:59'`;
        }
        wh++;
    }
    if (data.invNum !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND so_inv_num LIKE '%`+data.invNum+`%'`;
        }else{
            sql_where = sql_where + ` so_inv_num LIKE '%`+data.invNum+`%'`;
        }
        wh++;
    }
    if (data.contrNum !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND so_contr_num LIKE '%`+data.contrNum+`%'`;
        }else{
            sql_where = sql_where + ` so_contr_num LIKE '%`+data.contrNum+`%'`;
        }
        wh++;
    }
    if(wh > 0){
        sql = sql + ' WHERE ' + sql_where;
    }
    sql = sql + ` ORDER BY so_id  desc`;
    //console.log(sql)
    pool.query(sql
    , (err,res)=>{
        cb(err,res);
    });
}

exports.spisano = function(data, cb) {
    //console.log(data)
    let wh = 0,
        sql_where = '';
    let sql = `SELECT lo.*,to_char(lo.lb_date, 'DD.MM.YYYY') as lo_date, (te.te_name || ' ' || ma.ma_name || ' '|| eq.eq_name) as equip_name,
                --mo.mo_name, otd.ot_name,
                us.us_name, ac.ac_name, ac.ac_id
                FROM logbook lo  

                inner join users us
                on us.us_id = lb_usr_id

                inner join equip_spr eq
                on eq.eq_id = lo.lb_eq_id

                inner join marka_equip_spr ma
                on ma.ma_id = eq.eq_mark_id
                
                inner join type_equip_spr te
                on te.te_id = eq_type_id

                inner join act_spr ac
                on ac.ac_id = lb_act_id

                /*inner join mol_spr mo
                on mo.mo_id = lo.lb_mol_id

                inner join otd_spr otd
                on otd.ot_id = lo.lb_otd_id*/

    `;
    if ( data.flDate1 !== ''){
        sql_where = sql_where + ` lo.lb_date >= '`+data.flDate1+`'`;
        wh++;
    }
    if (data.flDate2 !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND lo.lb_date <= '`+data.flDate2+` 23:59:59'`;
        }else{
            sql_where = sql_where + ` lo.lb_date <= '`+data.flDate2+` 23:59:59'`;
        }
        wh++;
    }
    if (data.invNum !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND lo.lb_inv_num LIKE '%`+data.invNum+`%'`;
        }else{
            sql_where = sql_where + ` lo.lb_inv_num LIKE '%`+data.invNum+`%'`;
        }
        wh++;
    }
    if(wh > 0){
        sql = sql + ' WHERE ' + sql_where;
    }
    sql = sql + ` ORDER BY lo.lb_id  desc`;
    pool.query(sql
    , (err,res)=>{
        cb(err,res);
    });
}

exports.moving = function(data, cb) {
    //console.log(data)
    let wh = 0,
        sql_where = '';
    let sql = `SELECT et.*,to_char(et.et_date, 'DD.MM.YYYY') as et_date, (te.te_name || ' ' || ma.ma_name || ' '|| eq.eq_name) as equip_name,
                bl.bl_inv_num,
                mo.mo_name as mol1, otd.ot_name as otd1, mo2.mo_name as mol2, otd2.ot_name as otd2,
                us.us_name
                FROM equip_traff et  

                inner join users us
                on us.us_id = et.et_usr_id

                inner join balance bl
                on bl.bl_id = et.et_bl_id

                inner join equip_spr eq
                on eq.eq_id = bl.bl_eq_id

                inner join marka_equip_spr ma
                on ma.ma_id = eq.eq_mark_id
                
                inner join type_equip_spr te
                on te.te_id = eq_type_id

                inner join mol_spr mo
                on mo.mo_id = et.et_mol_id1

                inner join otd_spr otd
                on otd.ot_id = et.et_otd_id1

                inner join mol_spr mo2
                on mo2.mo_id = et.et_mol_id2

                inner join otd_spr otd2
                on otd2.ot_id = et.et_otd_id2

    `;
    if ( data.flDate1 !== ''){
        sql_where = sql_where + ` et.et_date >= '`+data.flDate1+`'`;
        wh++;
    }
    if (data.flDate2 !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND et.et_date <= '`+data.flDate2+`  23:59:59'`;
        }else{
            sql_where = sql_where + ` et.et_date <= '`+data.flDate2+`  23:59:59'`;
        }
        wh++;
    }
    if (data.invNum !== ''){
        if (wh !== 0){
            sql_where = sql_where + ` AND bl.bl_inv_num LIKE '%`+data.invNum+`%'`;
        }else{
            sql_where = sql_where + ` bl.bl_inv_num LIKE '%`+data.invNum+`%'`;
        }
        wh++;
    }
    if(wh > 0){
        sql = sql + ' WHERE ' + sql_where;
    }
    sql = sql + ` ORDER BY et.et_id desc`;
    pool.query(sql
    , (err,res)=>{
        cb(err,res);
    });
}

exports.download = async function(data, cb) {
    
}