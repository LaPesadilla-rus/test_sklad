const {Pool} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.all_zauvki = function(us_id,cb) {
    pool.query(`SELECT za_kat_id,za_type_id,za_marka_id, za_id, za_num, kat_name,te_name,ma_name,za_txt,za_status, za_user_id 
    FROM zauavki z
    inner join marka_equip_spr mes
    on mes.ma_id=z.za_marka_id
    inner join kategor_spr ks
    on ks.kat_id=z.za_kat_id 
    inner join users u
    on u.us_id=z.za_user_id
    inner join type_equip_spr tes
    on tes.te_id=z.za_type_id
    where za_user_id=`+us_id+`
    order by za_num DESC`,
     (err,res)=>{
        cb(err, res);
    }); 
} 
exports.new_zauvka = function(req, cb) {
console.log(req.headers)
    let data = req.body.data;
    var sql =  `INSERT INTO zauavki (za_kat_id, za_type_id, za_marka_id, za_txt, za_status,za_user_id)
                    VALUES (`+data.val_cat+`, `+data.val_type+`, `+data.val_mar+`, '`+data.textar+`', 0,`+req.headers.us_id+`)
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
    var sql = `Update zauavki SET za_kat_id=`+data.val_cat_ch+`,za_type_id=`+data.val_type_ch+`,za_marka_id=`+data.val_mar_ch+`,za_txt='`+data.sel_per_ch+`' where za_id=`+data.za_id+``;
  //  console.log(sql)
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
  //  console.log(req.data)
    var data=req.data
    var sql =  `DELETE FROM zauavki
    WHERE za_id = `+data.za_id+``;                        
    pool.query(sql
        , (err,res)=>{
            cb(err, 'DELETE COMPLITE');
        });
}


/* в апдейте и инсерт добавить us_id*/