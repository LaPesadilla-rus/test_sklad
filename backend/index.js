
var express = require('express');
var app = express();


/*const {Pool,Client} = require('pg');

const conn = require('./db_con.js');
const pool = new Pool (conn.conn_str);

const client = new Client(conn.conn_str);
client.connect();*/

const skladController = require('./controllers/sklad.js');
const sprController = require('./controllers/spr.js');
const otdelController = require('./controllers/otdel.js');



//workbook.eachSheet(function(worksheet, sheetId) {
//    console.log(sheetId)
//  });


//var worksheet = workbook.getWorksheet('Лист1');
//var worksheet = workbook.getWorksheet(1);
/*var ws = workbook.addWorksheet('My Sheet2');
ws.getCell('A1').value = 'sadsad';
console.log(ws.getCell('A1').value)*/


//if(typeof require !== 'undefined') xlsx = require('xlsx');
/*var workbook = xlsx.readFile('./docs/14-23.xlsx');
//console.log(workbook)

var sheet_name = workbook.SheetNames[0];
var adr_cell = 'A1';
var worksheet = workbook.Sheets[sheet_name];*/
/*var desired_cell = worksheet[adr_cell];
//console.log(worksheet);
worksheet['A2'].v = 'NEW VAL';
worksheet['A2'].w = 'NEW VAL';
worksheet['A2'].t = 's';
//var val = desired_cell.v;
//worksheet['A1'].v = 'NEW VALUE';
xlsx.writeFile(workbook, './docs/out.xlsx');*/

/*ws.cell(2, 1)
  .string('string')
  .style(style);
wb.write('./docs/out2.xlsx');*/
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


app.get('/sklad/new/provider', skladController.provider);
app.get('/sklad/new/marka', skladController.marka);
app.get('/sklad/new/units', skladController.units);
app.get('/sklad/new/kat', skladController.kat);
app.get('/sklad/kat', skladController.kat2);

app.post('/sklad/download', skladController.sklad_download);

app.post('/sklad/new/save', skladController.sklad_save);
app.post('/sklad/new/type', skladController.type_post);
app.post('/sklad/out', skladController.sklad_out);

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
app.get('/spr/equip/fullname', sprController.equip_fullname);

app.post('/spr/equip', sprController.equip)
app.post('/spr/save', sprController.spr_save);
app.post('/spr/update', sprController.spr_update);
app.post('/equip/update', sprController.equip_update);
app.post('/spr/relation/add', sprController.relation_add)

app.delete('/spr/delete', sprController.spr_delete);


//------------------------------
//OTDEL

//app.get('/otdel/all', async(req,res) =>{ return otdelController.all2(req,res)} );
app.get('/otdel/all', otdelController.all);
app.get('/otdel/data', otdelController.otd_data);
app.get('/otdel/all2', otdelController.all2);

app.post('/otdel/moveEQ', otdelController.moveEQ);
app.post('/otdel/spisat', otdelController.spisat);
//--------------------------------

app.get('/', function(req, res) {
    res.send('SKALD SERVER');
});

app.get('/local', function(req, res) {
    res.send('local');   
});

app.listen(4000, function() {
    console.log('SKLAD SERVER IS RUNNING');
});

