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
    })
}

exports.sklad_update = async function(req, res) {
    await Sklad.sklad_update(req ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });

    await Hyst.StorageUpdate(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    res.send('POST COMPLITE');
}

exports.sklad_out = async function(req, res) {
    //console.log(req.body.data);
    var arr = [];
    var a = [],
    errMes = [];
    arr = req.body.data.equip;

    //console.log(arr)
    for(var i = 0; i < arr.length; i++){
        a = await Sklad.sklad_out_midl3(arr[i]);
        //console.log(a)
        if (a.length > 0){
            /*await Sklad.sklad_out_midl2(arr[i],a, function(err,docs){
                if (err) {
                    console.log(err);
                    errMes.row = err;
                    errMes.txt = 'Ошибка выписки!';
                    return res.send(errMes);
                }
            });
            await Sklad.sklad_out_midl1(arr[i],req.body.data.mol_id,req.body.data.otd_id, function(err,docs){
                if (err) {
                    console.log(err);
                    errMes.row = err;
                    errMes.txt = 'Ошибка выписки!';
                    return res.send(errMes);
                }
            });*/
        }else{
            errMes.txt = 'Ошибка выписки на позиции: ' + (i + 1);
            res.send(errMes);
            i = 100;
        } 
        Hyst.StorageOut(a[0], req.body.data.mol_id, req.body.data.otd_id, arr[i].kol, req.body.data.user, function(err,docs){
            if (err) {
                console.log(err);
                //errMes.row = err;
                //errMes.txt = 'Ошибка выписки!';
                //return res.send(errMes);
            }
        });
    }

    /*const Excel = require('exceljs');
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('./docs/TR.xlsx').then(function(){
        //console.log(workbook.worksheets.id + ' ' + workbook.worksheets.name)
        var ws = workbook.getWorksheet(7);
        var n = 12;
        ws.getCell(9,3).value = req.body.data.user + ' отд' + req.body.data.otd_id;
        ws.getCell(9,13).value = req.body.data.user + ' отд' + req.body.data.otd_id;

        for(var i = 0; i < arr.length; i++){
            ws.getCell(n,2).value = i+1;
            ws.getCell(n,12).value = i+1;

            ws.getCell(n,3).value = arr[i].equip_name;
            ws.getCell(n,4).value = arr[i].st_un_id;
            ws.getCell(n,5).value = arr[i].kol;
            ws.getCell(n,13).value = arr[i].equip_name;
            ws.getCell(n,14).value = arr[i].st_un_id;
            ws.getCell(n,15).value = arr[i].kol;
            n++;
            ws.getCell(n,3).value = arr[i].st_inv_num;
            ws.getCell(n,13).value = arr[i].st_inv_num;
            n++;
        }

        workbook.xlsx.writeFile('./docs/test100.xlsx').then(function(){
            res.download('./docs/test100.xlsx');
        });
    });*/


    //res.send('OK');
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