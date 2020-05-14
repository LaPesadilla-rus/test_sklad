
var express = require('express');
var app = express();

const {Pool,Client} = require('pg');

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'sklad',
    password: 'masterkey',
    port: 5432
});


app.use(express.json());

app.get('/sklad/all', (req, res) => {
    pool.query(`SELECT eq.e_id, eq.e_kol, te.te_name, mn.m_name, eq.e_kod, kat.kat_name,
                    un.un_name, to_char(eq.e_date, 'DD.MM.YYYY')
                    
                    FROM equip eq
                    
                    inner join type_equip_spr te
                    on te.te_id = eq.e_type_eq
                    
                    inner join manufact_spr mn
                    on mn.m_id = eq.e_m_id
                    
                    inner join kategor_spr kat
                    on kat.kat_id = eq.e_kat_id
                    
                    inner join units_spr un
                    on un.un_id = eq.e_un_id

                    order by eq.e_id 
                `
    , (err,result)=>{
        if (err !== undefined) {
            console.log("Error:", err);
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
    pool.query(`SELECT * FROM manufact_spr`
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
    var sql = `INSERT INTO public.equip (e_type_eq, e_m_id, e_kod, e_kol, e_date)
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

app.get('/', function(req, res) {
    res.send('SKALD SERVER');
});

app.get('/local', function(req, res) {
    res.send('local');   
});

app.listen(5000, function() {
    console.log('SKLAD SERVER IS RUNNING');
});

