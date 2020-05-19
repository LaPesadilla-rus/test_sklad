
var express = require('express');
var app = express();
var timeout = require('connect-timeout');

const {Pool,Client} = require('pg');

const conn = require('./db_con.js');

/*const conn_str = new conn_str ({
    user: 'postgres',
    host: 'localhost',
    database: 'sklad',
    password: 'masterpas',
    port: 5432
});*/
//console.log(conn);
/*const spr = require('./modules/spr.js');
spr.getData();*/

var data = { kat: [], type_equip: [], marka_equip: [], provider: [], filial: [], units: []};
var mas = [{main: {}}];

const pool = new Pool (conn.conn_str);

const client = new Client(conn.conn_str);
client.connect();

app.use(express.json());

app.get('/sklad/all', (req, res) => {
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
                    on kat.kat_id = st.st_kat_id
                    
                    inner join units_spr un
                    on un.un_id = st.st_un_id

                    order by st.st_id 
                `
    , (err,result)=>{
        if (err !== undefined) {
            console.log("Error:", err.code + ' ' + err.hint);
        }else{

            res.json(result.rows); 
        }
    })
});

app.get('/sklad/new/type', (req, res) => { 
    pool.query(`SELECT * FROM type_equip_spr`
    , (err,result)=>{
        if (err !== undefined) {
            console.log("Error:", err);
        }else{
            res.json(result.rows);
        }
    });  
});

app.get('/sklad/new/manufact', (req, res) => { 
    pool.query(`SELECT * FROM provider_spr`
    , (err,result)=>{
        if (err !== undefined) {
            console.log("Error:", err);
        }else{
            res.json(result.rows); 
        }
    }); 
});

app.get('/sklad/new/units', (req, res) => { 
    pool.query(`SELECT * FROM units_spr`
    , (err,result)=>{
        if (err !== undefined) {
            console.log("Error:", err);
        }else{

            res.json(result.rows); 
        }
    }); 
});

app.get('/sklad/new/kat', (req, res) => { 
    pool.query(`SELECT * FROM kategor_spr`
    , (err,result)=>{
        if (err !== undefined) {
            console.log("Error:", err);
        }else{

            res.json(result.rows); 
        }
    }); 
});

app.post('/sklad/new/save', (req,res) => {
    if(!req.body.data) return res.sendStatus(400);
    var sql = `INSERT INTO public.storage (st_eq_id, st_pr_id, st_inv_num, st_amount, st_inp_date)
    VALUES ( `+req.body.data.e_type+`,`+req.body.data.f_name+`,'`+req.body.data.name+`',`+req.body.data.kol+`,'`+req.body.data.date+`');`;
    //console.log(sql); 
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
//------------------------------
// SPR

var mas2 = {};
var copy={};

app.get('/spr/all', (req,res) => {
    console.log('get: /spr/all');

    client.query(`SELECT kat_id as id, kat_name as item FROM kategor_spr order by item`, (err, result) => {
        if (err) {
            console.log("Error:", err);
        }else{
            data = {kat: result.rows};
            mas = [{item: result.rows, name: 'Категория', table:'kategor_spr'}];
            //client.end();
            //console.log('1');
        }
    })

    client.query(`SELECT te_id as id, te_name as item FROM type_equip_spr  order by item`, (err, result) => {
        if (err) {
            console.log("Error:", err);
        }else{
            data = {...data, type_equip: result.rows};
            mas = [...mas, {item: result.rows, name: 'Тип обоудования', table:'type_equip_spr'}];
            //client.end();
            //console.log('2');
        }
    })

    client.query(`SELECT ma_id as id, ma_name as item FROM marka_equip_spr  order by item`, (err, result) => {
        if (err) {
            console.log("Error:", err);
        }else{
            data = {...data, marka_equip: result.rows};
            mas = [...mas, {item: result.rows, name: 'Марка', table:'marka_equip_spr'}];
            //client.end();
            //console.log('3');
        }
    })
    
    client.query(`SELECT pr_id as id, pr_name as item FROM provider_spr  order by item`
    , (err,result)=>{
        if (err) {
            console.log("Error:", err);
        }else{
            data = {...data, provider: result.rows};
            mas = [...mas, {item: result.rows, name: 'Поставщик', table:'provider_spr'}];
            //console.log('4');
            //setTimeout(1000);
        }
    }); 
    client.query(`SELECT fi_id as id, fi_name as item FROM filial_spr  order by item`
    , (err,result)=>{
        if (err) {
            console.log("Error:", err);
        }else{
            data = {...data, filial: result.rows};
            mas = [...mas, {item: result.rows, name: 'Филиал', table:'filial_spr'}];
            //mas = Object.assign({},mas, copy);
            //console.log(mas2);
            //console.log('5');
        }
    }); 
    client.query(`SELECT un_id as id, un_name as item FROM units_spr  order by item`
    , (err,result)=>{
        if (err) {
            console.log("Error:", err);
        }else{
            data = {...data, units: result.rows};
           /* console.log('--');
            console.log(data);*/
            mas = [...mas,{item: result.rows, name: 'Ед. измерения', table:'units_spr'}];   
        }
    });

    /*client.query(`SELECT un_id as id, un_name as item FROM units_spr`
    , (err,result)=>{
        if (err) {
            console.log("Error:", err);
        }else{
            data = {...data, units: result.rows};
            mas = [...mas,{item: result.rows, name: 'Ед. измерения2', table:'units_spr'}];   
        }
    });

    client.query(`SELECT un_id as id, un_name as item FROM units_spr  order by item`
    , (err,result)=>{
        if (err) {
            console.log("Error:", err);
        }else{
            data = {...data, units: result.rows};
            mas = [...mas,{item: result.rows, name: 'Ед. измерения3', table:'units_spr'}];   
        }
    });*/

    client.query(`SELECT ot_id as id, ot_name as item FROM otd_spr  order by item`
    , (err,result)=>{
        if (err) {
            console.log("Error:", err);
        }else{
            data = {...data, otd: result.rows};
            mas = [...mas,{item: result.rows, name: 'Отделение', table:'units_spr'}];
            //console.log(mas);
            res.json(mas);
            mas = [{main: {}}];   
        }
    });
});

app.get('/spr/kat', (req,res) => {
    pool.query(`SELECT * FROM kategor_spr`
    , (err,result)=>{
        if (err !== undefined) {
            console.log("Error:", err);
        }else{
            res.json({item: result.rows, name: 'Категория', ref: 'kat'});
        }
    }); 
});

app.post('/spr/save', (req,res) => {
    console.log('/spr/save');
    if(!req.body.data) return res.sendStatus(400);
    var sql = `INSERT INTO public.units_spr (un_name)
                VALUES ('`+req.body.data.item+`');`;
    console.log(req.body); 
    /*pool.query(sql
    , (err,result)=>{
        if (err !== undefined) {
            console.log("Postgres INSERT error:", err);
        }else{
            console.log('complite');
            res.send('POST COMPLITE');
        }
    });*/
    res.send('POST COMPLITE');
});

app.post('/spr/update', (req,res) =>{
    var sql;
    console.log('/spr/update');
    if(!req.body.data) return res.sendStatus(400);
    console.log(req.body); 
    switch(req.body.data.table) {
        case 'units_spr': sql =  `UPDATE public.units_spr
                                    SET un_name ='`+req.body.data.item+`'
                                    WHERE un_id = `+req.body.data.id_item+``;
                                    break;
        default: res.send('POST COMPLITE');
    }
    if (sql){
        pool.query(sql
            , (err,result)=>{
                if (err) {
                    console.log("Postgres INSERT error:", err);
                }else{
                    res.send('POST COMPLITE');
                }
            });
    }
    
    //res.send('POST COMPLITE');
});

//------------------------------

app.get('/', function(req, res) {
    res.send('SKALD SERVER');
});

app.get('/local', function(req, res) {
    res.send('local');   
});

app.listen(5000, function() {
    console.log('SKLAD SERVER IS RUNNING');
});

