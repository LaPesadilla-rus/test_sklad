const {Pool} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

exports.all_zauvki = function(za){
    pool.query(`SELECT *  FROM zauvki order by za_date DESC`, (err,res)=>{
        za(err, res); 
    });
};

exports.new_zauvka = function(req, cb) {
    console.log(req.data)
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
    var sql;
    if(!req.body) return res.sendStatus(400);
    switch(req.body) {
        case 'cat': sql =  `UPDATE zauvki
                                    SET za_kat_id ='`+req.body.val_cat+`'
                                    WHERE za_num = `+req.body.zav_n+``;
                                    break;
        case 'marka': sql =  `UPDATE zauvki
                                    SET za_marka_id ='`+req.body.val_mar+`'
                                    WHERE za_num = `+req.body.za_num+``;
                                    break;
        case 'type': sql =  `UPDATE zauvki
                                    SET za_type_id ='`+req.body.val_type+`'
                                    WHERE za_num = `+req.body.za_num+``;
                                    break;
        case 'textar': sql =  `UPDATE zauvki
                                    SET za_txt ='`+req.body.textar+`'
                                    WHERE za_num = `+req.body.za_num+``;
                                    break;
        default: cb('','POST COMPLITE');
   
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
} }


exports.delete_zauvka=function(req,cb){
    var sql =  `DELETE FROM zauvki
    WHERE za_num = `+req.body.zav_n+``;                                 

if (sql){
    pool.query(sql
        , (err,res)=>{
            cb(err, 'DELETE COMPLITE');
        });
}}
