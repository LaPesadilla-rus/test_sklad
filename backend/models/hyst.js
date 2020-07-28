const {Pool/*, Client*/} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.spisatHystory = async function (docNum,data, us_id, cb) {
    //console.log(data, '-------')
    var sql = ` `;
     data.dop_upload.forEach(row => {
        sql = ` INSERT INTO public.history(
                hy_eq_id, hy_pr_id, hy_un_id, hy_amount, 
                hy_inv_num, hy_contr_num, hy_prim, hy_inp_usr, 
                hy_mol_id1, hy_otd_id1, hy_in_osn_id, 
                hy_act_id, hy_act_num, hy_user, hy_poyasn, hy_usr_id)
                VALUES ( `+row.bl_eq_id+`, `+row.bl_pr_id+`, `+row.bl_un_id+`, `+row.sp_amount+`, 
                            '`+row.bl_inv_num+`', '`+row.bl_contr_num+`', '`+row.bl_prim+`', '`+row.bl_inp_usr+`', 
                            `+row.bl_mol_id+`, `+row.bl_otd_id+`, `+data.equip[0].bl_id+`, 
                            `+data.act_id+`, `+docNum+`, '`+data.user+`', 'Списано', `+us_id+`);
        `;
        pool.query(sql, (err,res) => {
            cb(err,res);
        });
     });
}

exports.Move = async function (data, us_id, cb) {
    if (!data.mol_id){
        data.mol_id = data.row.bl_mol_id
    }
    var  sql = `INSERT INTO public.history(
                    hy_eq_id, hy_pr_id, hy_un_id, hy_amount, 
                    hy_inv_num, hy_contr_num, hy_prim, hy_inp_usr, 
                    hy_mol_id1, hy_otd_id1, hy_mol_id2, hy_otd_id2, 
                    hy_user, hy_poyasn, hy_usr_id)
                    VALUES ( `+data.row.bl_eq_id+`, `+data.row.bl_pr_id+`, `+data.row.bl_un_id+`, `+data.row.bl_amount+`, 
                                '`+data.row.bl_inv_num+`', '`+data.row.bl_contr_num+`', '`+data.row.bl_prim+`', '`+data.row.bl_inp_usr+`', 
                                `+data.row.bl_mol_id+`, `+data.row.bl_otd_id+`, `+data.mol_id+`, `+data.otd_id+`, 
                                '`+data.user+`', 'Движение', `+us_id+`);
                `; 
    pool.query(sql, (err,res) => {
            cb(err,res);
    });
}

exports.StorageUpdate = async function (data, us_id, cb) {
    var  sql = `INSERT INTO public.history(
                    hy_eq_id, hy_pr_id, hy_un_id, hy_amount, 
                    hy_inv_num, hy_contr_num, hy_prim, hy_inp_usr, 
                    hy_user, hy_poyasn, hy_usr_id, hy_buh_name)
                    VALUES ( `+data.equip_id+`, `+data.provider_id+`, `+data.units_id+`, `+data.kol+`, 
                                '`+data.inv_num+`', '`+data.dogvr_num+`', '`+data.prim+`', '`+data.row.st_inp_usr+`', 
                                '`+data.user+`', 'Обновление хранилища', `+us_id+`, '`+data.buh_name+`');
                `;  
    pool.query(sql, (err,res) => {
        cb(err,res);
    });
}

exports.StorageOut = async function ( data, mol_id, otd_id, kol, user, us_id, cb) {
    var  sql = `INSERT INTO public.history(
                    hy_eq_id, hy_pr_id, hy_un_id, hy_amount, 
                    hy_inv_num, hy_contr_num, hy_prim, hy_inp_usr,
                    hy_otd_id1, hy_mol_id1,
                    hy_user, hy_poyasn, hy_usr_id, hy_buh_name)
                    VALUES ( `+data.st_eq_id+`, `+data.st_pr_id+`, `+data.st_un_id+`, `+kol+`, 
                                '`+data.st_inv_num+`', '`+data.st_contr_num+`', '`+data.st_prim+`', '`+data.st_inp_usr+`', 
                                `+otd_id+`, `+mol_id+`,
                                '`+user+`', 'Выписано', `+us_id+`, '`+data.st_buh_name+`');
                `;  
    pool.query(sql, (err,res) => {
        cb(err,res);
    });
}

exports.StorageIn = async function ( data, us_id, cb) {
    var  sql = `INSERT INTO public.history(
                    hy_eq_id, hy_pr_id, hy_un_id, hy_amount, 
                    hy_inv_num, hy_contr_num, hy_prim,
                    
                    hy_user, hy_poyasn, hy_usr_id)
                    VALUES ( `+data.equip_id+`, `+data.provider_id+`, `+data.units_id+`, `+data.kol+`, 
                                '`+data.inv_num+`', '`+data.dogvr_num+`', '`+data.prim+`', 
                                
                                '`+data.user+`', 'Поступило', `+us_id+`);
                `;  
    pool.query(sql, (err,res) => {
        cb(err,res);
    });
}

/**
 * history
 * (
 * hy_eq_id,        // int
 * hy_pr_id,        // int
 * hy_un_id,        // int
 * hy_amount,       // int
 * hy_inv_num,      // varchar
 * hy_contr_num,    // varchar
 * hy_prim,         // text
 * hy_inp_usr,      // varchar
 * hy_mol_id1,      // int
 * hy_otd_id1,      // int
 * hy_mol_id2,      // int
 * hy_otd_id2,      // int
 * hy_act_id,       // int
 * hy_act_num,      // int
 * hy_user,         // varchar
 * hy_poyasn        // text
 * )
    VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

    hy_date - генерируется при записи в базе
 */