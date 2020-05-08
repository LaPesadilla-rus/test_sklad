
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
    try{ 
        pool.query(`SELECT eq.e_id, eq.e_kol, te.te_name, mn.m_name, eq.e_kod,
                    to_char(eq.e_date, 'DD.MM.YYYY')
                    
                    FROM equip eq
                    
                    inner join type_equip te
                    on te.te_id = eq.e_type_eq
                    
                    inner join manufact mn
                    on mn.m_id = eq.e_m_id

                    order by eq.e_id
                    `
        , (err,result)=>{
            res.json(result.rows);
    })
    } catch (err) {
        console.log(err);
    }
  
});

app.get('/sklad/new/type', (req, res) => { 
    pool.query(`SELECT * FROM type_equip`
    , (err,result)=>{
        if (err !== undefined) {
            console.log("Error:", err);
        }else{
            res.json(result.rows);
        }
    });  
});

app.get('/sklad/new/man', (req, res) => { 
    pool.query(`SELECT * FROM manufact`
    , (err,result)=>{
        //res.json(result.rows);
        if (err !== undefined) {
            console.log("Error:", err);
        }else{
            res.json(result.rows); 
        }
    }); 
});

/*app.get('/sklad/new', (req, res) => {
    try{ 
        pool.query(`SELECT * FROM type_equip`
        , (err,result)=>{
            for(var i = 0; i < result.rows.length; i++){
                dt.push({
                    id : result.rows[i].m_id,
                    f_name : result.rows[i].m_name
                })
            }
            //res.json(dt);
            console.log(dt);
        });
    } catch (err) {
        console.log(err);
    }
    console.log(dt);
  
});*/

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

