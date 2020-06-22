
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
app.get('/sklad/out_data', skladController.out_data);

app.post('/sklad/download', skladController.sklad_download);

app.post('/sklad/new/save', skladController.sklad_save);
app.post('/sklad/new/update', skladController.sklad_update);
app.post('/sklad/new/type', skladController.type_post);
app.post('/sklad/out', skladController.sklad_out);
//app.post('/sklad/out_file', skladController.out_file);

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
app.get('/otdel/filter_data', otdelController.filter_data);

app.post('/otdel/moveEQ', otdelController.moveEQ);
app.post('/otdel/spisat14_23', otdelController.spisat14_23);
app.post('/otdel/spisat14_27', otdelController.spisat14_27);
app.post('/otdel/spisat14_29', otdelController.spisat14_29);
app.post('/otdel/all_filter', otdelController.all_filter);
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

//-----------------------------------------------------
//var arr = [0, 12, 8, 1, 6, 2, 7]
arr = [1, 20, 4, 8, 3, 0, 5];

function convert(mas){
  var ret_arr = [];
  ret_arr = mas.sort((a,b)=>a-b);
  return (ret_arr)
}

function rev(mas){
    var ret_arr = [],                                   // возвращаемый массив
    val = 0,                                            // промежуточная переменная
    del = 0;
    var prom_arr = mas.slice();                         //записываем в prom_arr переданный массив

    var n = 0;                                          // переменная счетчик
    while (prom_arr.length > 0) {                       // гоняем массив
        val = prom_arr[0];
        del = 0;
        n = 0;
        while (n < prom_arr.length){                    // ищем максимальное число из оставшихся
            if(val < prom_arr[n]){
                
                val = prom_arr[n];
                del = n;
            }
            n++;
        }
        prom_arr.splice(del,1);                         // удаляем максимальное число из prom_arr
        ret_arr.push(val)                               // записываем полученное число в возвращаемый массив
    }
    return(ret_arr);
}


function plus(mas){
  var ret_arr_pl = arr;
  ret_arr_pl[7] = 42
  return (ret_arr_pl)
}

/*console.log(arr)
console.log(rev(arr))
console.log(convert(arr))
console.log(plus(arr))
console.log(arr.length)*/


