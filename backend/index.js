
var express = require('express');
var app = express();



/*app.get('/', function(req, res) {
    res.send('SKALD SERVER');
});*/

//var pgp = require("pg-promise")(/*options*/);
//const connectionString = 'postgresql://postgre:masterkey@localhost:5432/sklad'
//var db = pgp(connectionString);*/

const {Pool,Client} = require('pg');

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'sklad',
    password: 'masterkey',
    port: 5432
});


/*try{
    db.query('SELECT * FROM users', (err, res) => {
        console.log(err, res);
    });
} catch (err) {
    console.log(err);
}*/

app.use(express.json());

app.get('/users', (req, res) => {
    try{ 
        pool.query('SELECT Count(*) FROM users', (err,result)=>{
            //console.log(result.rows);//
            res.json(result.rows);
            //pool.end();
    })
    } catch (err) {
        console.log(err);
    }
  
});

app.get('/', function(req, res) {
    res.send('SKALD SERVER');
});

app.get('/local', function(req, res) {
    res.send('local');   
});

/*app.use('/users', (req,res) => {
    console.log("REQUEST", req.method);
    res.send('users + Request: ');
});*/

/*app.get('/users', function(req, res) {
    res.send('users');
});*/

/*db.any('SELECT * FROM users')
    .then(rows => {
        console.log(rows);
        res.json(rows)
    });*/


app.listen(5000, function() {
    console.log('SKLAD SERVER IS RUNNING');
});

