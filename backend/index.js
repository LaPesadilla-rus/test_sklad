
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

const dt = [];
app.use(express.json());

app.get('/sklad/all', (req, res) => {
    try{ 
        pool.query(`SELECT eq.e_id, te.te_name, mn.m_name, eq.e_kod,
                    to_char(eq.e_date, 'DD.MM.YYYY')
                    
                    FROM equip eq
                    
                    inner join type_equip te
                    on te.te_id = eq.e_type_eq
                    
                    inner join manufact mn
                    on mn.m_id = eq.e_m_id
                    `
        , (err,result)=>{
            res.json(result.rows);
    })
    } catch (err) {
        console.log(err);
    }
  
});

/*app.use('/sklad/new', (req, res) => {
    try{ 
        pool.query(`SELECT * FROM manufact`
        , (err,result)=>{
            res.json(result.rows);
            dt.push({
                id : result.rows[0].m_id,
                f_name : result.rows[0].m_name
            })
            console.log(dt);
        });
    } catch (err) {
        console.log(err);
    }
    
});*/

app.get('/sklad/new', (req, res) => {
    try{ 
        pool.query(`SELECT * FROM type_equip`
        , (err,result)=>{
            res.json(result.rows);
        });
        pool.query(`SELECT * FROM type_equip`
        , (err,result2)=>{
            //res.json(result2.rows);
        });
    } catch (err) {
        console.log(err);
    }
    console.log(dt);
  
});

app.post('/sklad/new/save', (req,res) => {
    if(!req.body.data) return res.sendStatus(400);
    console.log(req.body.data);
    res.send('POST COMPLITE');
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

