var express = require('express');
var app = express();
//-----
//var pgp = require("pg-promise")(/*options*/);
/*const connectionString = 'postgresql://postgre:masterkey@127.0.0.1:5432/sklad'
var db = pgp(connectionString);

app.use(express.json());

app.use('/123', (req, res) => {
    db.any('SELECT * FROM users')
    .then(rows => {
        console.log(rows);
        res.json(rows)
    })
});*/
//---
app.get('/', function(req, res) {
    res.send('SKALD SERVER FR');
});

app.listen(3000, function() {
    console.log('SKLAD SERVER IS RUNNING');
});

