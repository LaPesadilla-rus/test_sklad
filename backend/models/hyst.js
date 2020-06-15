const {Pool/*, Client*/} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.spisatHystory = async function (docNum,data, cb) {
    //console.log(data);
    var sql = ` INSERT INTO public.history(
                     hy_eq_id, hy_pr_id, hy_un_id, hy_amount, 
                    hy_inv_num, hy_contr_num, hy_prim, hy_inp_usr, 
                    hy_mol_id1, hy_otd_id1, hy_mol_id2, hy_otd_id2, 
                    hy_act_id, hy_act_num, hy_user, hy_poyasn)
                    VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, `+data.act_id+`, `+docNum+`, '`+data.user+`', 'Списано');
     `;
     data.dop_upload.forEach(row => {
        sql = ` INSERT INTO public.history(
                hy_eq_id, hy_pr_id, hy_un_id, hy_amount, 
                hy_inv_num, hy_contr_num, hy_prim, hy_inp_usr, 
                hy_mol_id1, hy_otd_id1, hy_in_osn_id, 
                hy_act_id, hy_act_num, hy_user, hy_poyasn)
                VALUES ( `+row.bl_eq_id+`, `+row.bl_pr_id+`, `+row.bl_un_id+`, `+row.bl_amount+`, 
                            '`+row.bl_inv_num+`', '`+row.bl_contr_num+`', '`+row.bl_prim+`', '`+row.bl_inp_usr+`', 
                            `+row.bl_mol_id+`, `+row.bl_otd_id+`, `+data.osn_upload[0].bl_id+`, 
                            `+data.act_id+`, `+docNum+`, '`+data.user+`', 'Списано');
        `;
        pool.query(sql).then (
            (res) => {
                //cb('',res);
            }
        ).catch(function(err) {
            cb(err,'');
        });
     });
}

exports.Move = async function (data, cb) {
    var  sql = `INSERT INTO public.history(
                    hy_eq_id, hy_pr_id, hy_un_id, hy_amount, 
                    hy_inv_num, hy_contr_num, hy_prim, hy_inp_usr, 
                    hy_mol_id1, hy_otd_id1, hy_mol_id2, hy_otd_id2, 
                    hy_user, hy_poyasn)
                    VALUES ( `+data.row.bl_eq_id+`, `+data.row.bl_pr_id+`, `+data.row.bl_un_id+`, `+data.row.bl_amount+`, 
                                '`+data.row.bl_inv_num+`', '`+data.row.bl_contr_num+`', '`+data.row.bl_prim+`', '`+data.row.bl_inp_usr+`', 
                                `+data.row.bl_mol_id+`, `+data.row.bl_otd_id+`, `+data.mol_id+`, `+data.otd_id+`, 
                                '`+data.user+`', 'Движение');
                `;  
    pool.query(sql).then (
        (res) => {
            //cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
    });
}

exports.StorageUpdate = async function (data, cb) {
    //console.log(data)
    var  sql = `INSERT INTO public.history(
                    hy_eq_id, hy_pr_id, hy_un_id, hy_amount, 
                    hy_inv_num, hy_contr_num, hy_prim, hy_inp_usr, 
                    hy_user, hy_poyasn)
                    VALUES ( `+data.equip_id+`, `+data.provider_id+`, `+data.units_id+`, `+data.kol+`, 
                                '`+data.inv_num+`', '`+data.dogovor_num+`', '`+data.prim+`', '`+data.row.st_inp_usr+`', 
                                '`+data.user+`', 'Обновление хранилища');
                `;  
    //console.log(sql);
    //cb('','');
    pool.query(sql).then (
        (res) => {
            //cb('',res);
        }
    ).catch(function(err) {
        cb(err,'');
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