
var express = require('express');
var app = express();


const {Pool,Client} = require('pg');

const conn = require('./db_con.js');
const pool = new Pool (conn.conn_str);

const client = new Client(conn.conn_str);
client.connect();

const skladController = require('./controllers/sklad.js');
const sprController = require('./controllers/spr.js');

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

//test 22.05.2020
app.use(express.json());

//----------------------------------------
app.get('/sklad/all', skladController.all);

app.get('/sklad/new/type', skladController.type);
app.post('/sklad/new/type', skladController.type_post);

app.get('/sklad/new/provider', skladController.provider);
app.get('/sklad/new/marka', skladController.marka);
app.get('/sklad/new/units', skladController.units);
app.get('/sklad/new/kat', skladController.kat);
app.get('/sklad/kat', skladController.kat2);

app.post('/sklad/new/save', skladController.sklad_save);

//------------------------------
app.post('/equip/save', skladController.equip_save);
//--------------------------------
//------------------------------
// SPR
app.get('/spr/all', sprController.all);
app.get('/spr/kat', sprController.kat);
app.get('/spr/type', skladController.type_a);
app.get('/spr/equip_name', sprController.equip_name);
app.get('/spr/equip_all', sprController.equip_all);

app.post('/spr/equip', sprController.equip)
app.post('/spr/save', sprController.spr_save);
app.post('/spr/update', sprController.spr_update);
app.post('/equip/update', sprController.equip_update);
app.post('/spr/relation/add', sprController.relation_add)

app.delete('/spr/delete', sprController.spr_delete);


//------------------------------

//--------------------------------

app.get('/', function(req, res) {
    res.send('SKALD SERVER');
});

app.get('/local', function(req, res) {
    res.send('local');   
});

app.listen(5000, function() {
    console.log('SKLAD SERVER IS RUNNING');
});

