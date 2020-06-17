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

exports.sklad_out = function(req, res) {
    var data = [];
    console.log(req.body.data)
    /*Sklad.sklad_out(req ,function(err,docs){
        if (err) {
            return res.sendStatus(500);
        }
        data = docs;
        Sklad.sklad_out_midl1(data, req, function(err,docs){
            if (err) {
                return res.sendStatus(500);
            }
            Sklad.sklad_out_midl2(data,req, function(err,docs){
                if (err) {
                    return res.sendStatus(500);
                }
                res.send(docs);
            })
        })
    }); */
    res.sendStatus(200);
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