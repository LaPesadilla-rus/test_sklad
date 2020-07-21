const {Pool} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.all_zauvki = function(data,cb) {
    pool.query(`SELECT za_kat_id,za_type_id,za_marka_id, za_id, za_num, kat_name,te_name,ma_name,za_txt,za_status 
    FROM zauavki z
    inner join marka_equip_spr mes
    on mes.ma_id=z.za_marka_id
    inner join kategor_spr ks
    on ks.kat_id=z.za_kat_id 
    inner join type_equip_spr tes
    on tes.te_id=z.za_type_id`,
     (err,res)=>{
        cb(err, res);
    }); 
} 
exports.new_zauvka = function(req, cb) {
 //   console.log(req.data)
    let data = req.data;
    var sql =  `INSERT INTO zauavki (za_kat_id, za_type_id, za_marka_id, za_txt, za_status)
                    VALUES (`+data.val_cat+`, `+data.val_type+`, `+data.val_mar+`, '`+data.textar+`', 0)
                `;
                console.log(sql)
    pool.query(sql 
        ,(err,res)=>{
            cb(err,'SAVE COMPLITE');
        });
}

exports.update_zauvka= function(req,cb) {
   console.log(req)
    var data=req.data;
    var sql = `Update zauavki SET za_kat_id=`+data.val_cat_ch+`,za_type_id=`+data.val_type_ch+`,za_marka_id=`+data.val_mar_ch+`,za_txt='`+data.sel_per_ch+`'where za_id=`+data.za_id+``;
    console.log(sql)
    if (sql){
        pool.query(sql
            , (err,res)=>{
                if (err) {
                    console.log("Postgres INSERT error:", err);
                }else{
                    cb(err,'UPDATE COMPLITE');
                }
            });
    }
} 


exports.delete_zauvka=function(req,cb){
    var sql =  `DELETE FROM zauavki
    WHERE za_id = `+req.body.za_id+``;                        

if (sql){
    pool.query(sql
        , (err,res)=>{
            cb(err, 'DELETE COMPLITE');
        });
}}
