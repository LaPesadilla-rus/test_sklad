const Sklad = require('../models/sklad.js');
const Hyst = require('../models/hyst.js');

exports.all = function(req, res) {
    Sklad.all(function(err, docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
};

exports.filterAll = function(req, res) {
    Sklad.filterAll(req.body.data, function(err, docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
};

exports.provider = function(req,res) {
    Sklad.provider(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.marka = function(req, res) {
    Sklad.marka(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.units = function(req, res) {
    Sklad.units(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.type = function(req, res) {
    Sklad.type(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.type_a = function(req, res) {
    Sklad.type_a(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.type_post = function(req, res) {
    Sklad.type_post(req.body.kat, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.kat = function(req, res) {
    Sklad.kat(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.kat2 = function(req, res) {
    Sklad.kat2(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.equip_save = function(req, res) {
    Sklad.equip_save(req ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.sklad_save = function(req, res) {
    Sklad.sklad_save(req ,function(err,docs){
        if (err) {
            //console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
    Sklad.sklad_save_in(req ,function(err,docs){
        if (err) {
            //console.log(err);
            return res.sendStatus(500);
        }
        //res.send(docs);
    });
    Hyst.StorageIn(req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
}

exports.sklad_update = async function(req, res) {
    await Sklad.sklad_update(req ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });

    await Hyst.StorageUpdate(req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    res.send('POST COMPLITE');
}

exports.sklad_out = async function(req, res) {
    var arr = [];
    var mas1 = [],
    item_arr = [],
    errMes = {};
    arr = req.body.data.equip;

    //console.log(arr)
    // проверка на доступность, НЕ ОПТИМИЗИРОВАННО!
    for(var i = 0; i < arr.length; i++){
        let mas = await Sklad.sklad_out_midl3(arr[i]);
        //console.log(mas)
        item_arr.push(mas[0])
        if (mas.length = 0){
            errMes.errTxt = 'Ошибка выписки на позиции: ' + (i + 1);
            errMes.errPos = i;
            return res.send(errMes)
        }
    }
    for(var i = 0; i < arr.length; i++){
        let mas = item_arr[i];
        await Sklad.sklad_out_midl2(arr[i],mas, function(err,docs){
            if (err) {
                console.log(err);
                errMes.row = err;
                errMes.errTxt = 'Ошибка выписки!';
                errMes.errPos = i;
                return res.send(errMes);
            }
        });
        if (arr[i].eq_kat_id !== 2){
            await Sklad.sklad_out_midl1(arr[i],req.body.data.mol_id,req.body.data.otd_id, function(err,docs){
                if (err) {
                    console.log(err);
                    errMes.row = err;
                    errMes.errTxt = 'Ошибка выписки!';
                    errMes.errPos = i;
                    return res.send(errMes);
                }
            });
        }
        await Sklad.sklad_out_midl0(arr[i],req.body.data.mol_id,req.body.data.otd_id, req.body.data.user, function(err,docs){
            if (err) {
                console.log(err);
                errMes.row = err;
                errMes.errTxt = 'Ошибка выписки!';
                errMes.errPos = i;
                return res.send(errMes);
            }
        }); 
        //console.log('sadasd')
        Hyst.StorageOut(mas, req.body.data.mol_id, req.body.data.otd_id, arr[i].kol, req.body.data.user, req.headers.us_id, function(err,docs){
            if (err) {
                console.log(err);
            }
        });
    }
    res.send('OK');
}

//вроде это не нужно уже
exports.out_file = async function (req, res){
    var arr = [];
    arr = req.body.data.equip;
    const Excel = require('exceljs');
    
    var workbook = new Excel.Workbook();
    var randVal = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
    console.log(req.body.data)
    await workbook.xlsx.readFile('./docs/TR.xlsx').then( async function(){
        //console.log(workbook.worksheets.id + ' ' + workbook.worksheets.name)
        var ws = workbook.getWorksheet(7);
        var n = 12;
        ws.getCell(9,3).value = req.body.data.mol_name + ' отд. ' + req.body.data.otd_name;
        ws.getCell(9,13).value = req.body.data.mol_name + ' отд. ' + req.body.data.otd_name;

        for(var i = 0; i < arr.length; i++){
            ws.getCell(n,2).value = i+1;
            ws.getCell(n,12).value = i+1;

            ws.getCell(n,3).value = arr[i].st_buh_name;
            ws.getCell(n,4).value = arr[i].un_name;
            ws.getCell(n,5).value = arr[i].kol;
            ws.getCell(n,13).value = arr[i].st_buh_name;
            ws.getCell(n,14).value = arr[i].un_name;
            ws.getCell(n,15).value = arr[i].kol;
            n++;
            ws.getCell(n,3).value = arr[i].st_inv_num;
            ws.getCell(n,13).value = arr[i].st_inv_num;
            n++;
        }

        await workbook.xlsx.writeFile('./docs/test100_T.xlsx').then(function(){
            res.download('./docs/test100_T.xlsx');
           
        });
        
    });
    //await delFile(randVal);
}

delFile = (val) => {
    const fs = require("fs");
    const path = require('path')
    var filepath = path.dirname(__dirname)
    filepath = filepath.replace(/\\/g, "/");
    fs.unlinkSync(filepath + `/docs/test`+val+`_T.xlsx`);
}

exports.sklad_download = function(req,res){
    //console.log(req.body.data)
    const Excel = require('exceljs');

    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('./docs/14-23.xlsx').then(function(){
        var ws = workbook.getWorksheet(1);
        ws.getCell(11,6).value = req.body.data.user;

        workbook.xlsx.writeFile('./docs/test10.xlsx').then(function(){
            res.download('./docs/test10.xlsx');
        });
    });
}

exports.out_data = async function(req, res) {
    var data = {};
    await Sklad.out_data_otd(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.otd_data = docs.rows;
    });
    await Sklad.out_data_mol(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.mol_data = docs.rows;
    });
    await Sklad.out_data_kat(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.kat_data = docs.rows;
    });
    await Sklad.out_data_equip(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.equip_data = docs.rows;
    });
    res.send(data);
}