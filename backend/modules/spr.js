var express = require('express');
var app = express();

const {Pool,Client} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool(conn.conn_str);

module.exports.getData = function() {
    app.get('/spr', (req,res) => {
        pool.query(`SELECT * FROM units_spr`
        , (err,result)=>{
            if (err !== undefined) {
                console.log("Error:", err);
            }else{
                result.rows.name = 'units';
                res.setHeader('Units');
                res.json(result.rows);
                
                
                console.log(res.rows); 
            }
        }); 
    });

    app.post('/units/save', (req,res) => {
        if(!req.body.data) return res.sendStatus(400);
        var sql = `INSERT INTO public.units_spr (un_name)
        VALUES ('`+req.body.data.units+`');`;
        console.log(sql); 
        pool.query(sql
        , (err,result)=>{
            if (err !== undefined) {
                console.log("Postgres INSERT error:", err);
            }else{
                console.log('complite');
                res.send('POST COMPLITE');
            }
        });
    });

    console.log('SPR module');
}