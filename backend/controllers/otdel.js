const Otdel = require('../models/otdel.js');
const Hyst = require('../models/hyst.js');
const Files_14_23 = require('../docsWorker/14-23');
const Files_14_25 = require('../docsWorker/14-25');
const Files_14_27 = require('../docsWorker/14-27');
const Files_14_29 = require('../docsWorker/14-29');
const Files_14_31 = require('../docsWorker/14-31');
const Files_14_33 = require('../docsWorker/14-33');
const Files_defect = require('../docsWorker/file_defect');

exports.primUpd = function(req, res) {
    Otdel.primUpd(req.body.data ,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

/*exports.all = function(req, res) {
    var data = [];
    Otdel.otd_name( function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data = { otd: docs.rows };
        Otdel.mol_name( function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            data = {...data, mol: docs.rows };
            Otdel.all( function (err, docs) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                data = {...data, data: docs.rows };
                res.send(data);
            });
        });
    });
};*/
exports.New_eq = function(req,res) {
    Otdel.New_eq(req.body.data,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.otd_data = function(req, res) {
    var data = [];
    Otdel.otd_data_otd( function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data = { otd: docs.rows };
        //res.send(data);
        Otdel.otd_data_mol( function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            data = {...data, mol: docs.rows };
            res.send(data);
        });
    });
};

exports.moveEQ = async function(req, res) {
    console.log(req.body.data)
    var data = [];
    await Otdel.moveEQ(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    await Otdel.moveEqLog(req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    Hyst.Move(req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    res.send('MOVE COMPLITE');
};

//Правильная функция на вывод данных по всем отделам
exports.all2 = async function(req, res) {
    var data = [];
    var mol_data;
    var equip_data;
    var otd_equip;
    var out_equip;
    var docs = {}; 

    data = await Otdel.otd_data_otd1(1);
    docs.otd_data = data;
    for (var i = 0; i < data.length; i++){
        mol_data = await Otdel.otd_data_mol1(data[i].ot_id);
        for (var n = 0; n < mol_data.length; n++){
            equip_data = await Otdel.otd_data_equip1(mol_data[n].mo_id, data[i].ot_id, 'main');
            out_equip = await Otdel.otd_data_equip1(mol_data[n].mo_id, data[i].ot_id, 'out');
            mol_data[n].equip_data = equip_data;
            mol_data[n].out_equip = out_equip;
        }
        
        otd_equip = await Otdel.otd_data_equip1('', data[i].ot_id, 'otd');
        data[i].otd_equip = otd_equip;
        data[i].mol_data = mol_data;
    }

    res.send(docs);
};

exports.filter_data = async function(req, res) {
    var out_data = {}; 
    await Otdel.filter_data_otd(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        out_data.otd_data = docs.rows;
    });
    await Otdel.filter_data_mol(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        out_data.mol_data = docs.rows;
    });
    await Otdel.filter_data_eq(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        out_data.eq_data = docs.rows;
    });
    res.send(out_data);
};

exports.all_filter = async function(req, res) {
    var data = [];
    var mol_data;
    var equip_data;
    var otd_equip;
    var out_equip,
    eq_id = req.body.data.eq_id;
    var docs = {};
    if (req.body.data.mo_id !== ''){
        mol_data = await Otdel.otd_data_mol_filter2(req.body.data.mo_id);
        data = await Otdel.otd_data_otd_filter(mol_data[0].mo_otd_id);
    }else{
        data = await Otdel.otd_data_otd_filter(req.body.data.ot_id);
    } 
    docs.otd_data = data;
    for (var i = 0; i < data.length; i++){
        mol_data = await Otdel.otd_data_mol_filter(data[i].ot_id, req.body.data.mo_id);
        for (var n = 0; n < mol_data.length; n++){
            equip_data = await Otdel.otd_data_equip1(mol_data[n].mo_id, data[i].ot_id, 'main',eq_id);
            out_equip = await Otdel.otd_data_equip1(mol_data[n].mo_id, data[i].ot_id, 'out',eq_id);
            mol_data[n].equip_data = equip_data;
            mol_data[n].out_equip = out_equip;
        }
        otd_equip = await Otdel.otd_data_equip1('', data[i].ot_id, 'otd',eq_id);
        data[i].otd_equip = otd_equip;
        data[i].mol_data = mol_data;
    }
    res.send(docs);
};

exports.spisat14_23 = async function(req, res) {
    let docNum;
    var data = req.body.data;
    await Otdel.spisatDocNum(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (docs.rows[0].max == false){
            docNum = docs.rows[0].max;
        }else{
            docNum = docs.rows[0].max + 1;
        }
        
    });
    for (i = 0; i < req.body.data.equip.length; i++){
        await Otdel.spisatInsert(docNum, req.body.data, req.body.data.equip[i], req.headers.us_id, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
    }
    
    await Hyst.spisatHystory(docNum, req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    
    Files_14_23.file_14_23(data, req, docNum, res)
}

exports.spisat14_27 = async function(req, res) {
    let docNum;
    var data = req.body.data;
    await Otdel.spisatDocNum(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //console.log(docs.rows[0].max + ' max')
        if (docs.rows[0].max == false){
            docNum = docs.rows[0].max;
        }else{
            docNum = docs.rows[0].max + 1;
        }
        
    });
    for (i = 0; i < req.body.data.equip.length; i++){
        await Otdel.spisatInsert(docNum, req.body.data, req.body.data.equip[i], req.headers.us_id, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
    }
    await Hyst.spisatHystory(docNum, req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    
    Files_14_27.file_14_27(data, req, docNum, res);
}

exports.spisat14_29 = async function(req, res) {
    let docNum;
    var data = req.body.data;
    await Otdel.spisatDocNum(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //console.log(docs.rows[0].max + ' max')
        if (docs.rows[0].max == false){
            docNum = docs.rows[0].max;
        }else{
            docNum = docs.rows[0].max + 1;
        }
        
    });
    for (i = 0; i < req.body.data.equip.length; i++){
        await Otdel.spisatInsert(docNum, req.body.data, req.body.data.equip[i], req.headers.us_id, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
    }
    await Hyst.spisatHystory(docNum, req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });

    Files_14_29.file_14_29(data, req, docNum, res);
}

exports.spisat14_25 = async function(req, res) {
    let docNum;
    var data = req.body.data;
    await Otdel.spisatDocNum(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //console.log(docs.rows[0].max + ' max')
        if (docs.rows[0].max == false){
            docNum = docs.rows[0].max;
        }else{
            docNum = docs.rows[0].max + 1;
        }
        
    });
    for (i = 0; i < req.body.data.equip.length; i++){
        await Otdel.spisatInsert(docNum, req.body.data, req.body.data.equip[i], req.headers.us_id, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
    }
    await Hyst.spisatHystory(docNum, req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });

    Files_14_25.file_14_25(data, req, docNum, res);
}
exports.spisat14_31 = async function(req, res) {
    let docNum;
    var data = req.body.data;
    await Otdel.spisatDocNum(data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //console.log(docs.rows[0].max + ' max')
        if (docs.rows[0].max == false){
            docNum = docs.rows[0].max;
        }else{
            docNum = docs.rows[0].max + 1;
        }
        
    });
    for (i = 0; i < data.equip.length; i++){
     //console.log(data.equip)
        await Otdel.Update_used(data,data.equip[i], function(err,docs){
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            
        })

        await Otdel.spisatInsert(docNum, data, data.equip[i], req.headers.us_id, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
    }
    await Hyst.spisatHystory( docNum, data,req.headers.us_id,  function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });

    Files_14_31.file_14_31( data, req, docNum, res);
}
exports.spisat14_33 = async function(req, res) {
    let docNum;
    var data = req.body.data;
    await Otdel.spisatDocNum(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        if (docs.rows[0].max == false){
            docNum = docs.rows[0].max;
        }else{
            docNum = docs.rows[0].max + 1;
        }
        
    });
    for (i = 0; i < req.body.data.equip.length; i++){
       
      await Otdel.Update_used(data,req.body.data.equip[i], function(err,docs){
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            
        })
     await Otdel.spisatInsert(docNum, req.body.data, req.body.data.equip[i], req.headers.us_id, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
    }
  await Hyst.spisatHystory(docNum, req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });

    Files_14_33.file_14_33(data, req, docNum, res);
}
exports.Delete_used = function(req, res) {
    Otdel.Delete_used(req.body.data, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}
exports.Update_used = function(req, res) {
    Otdel.Update_used(req.body.data, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.spisatDefect = async function(req, res) {
    let docNum;
    var data = req.body.data;
    await Otdel.spisatDocNum(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (docs.rows[0].max == false){
            docNum = docs.rows[0].max;
        }else{
            docNum = docs.rows[0].max + 1;
        }
        
    });
    for (i = 0; i < req.body.data.equip.length; i++){
        await Otdel.spisatInsert(docNum, req.body.data, req.body.data.equip[i], req.headers.us_id, function (err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
    }
    
    await Hyst.spisatHystory(docNum, req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    
    Files_defect.file_defect(data, req, docNum, res)
}

exports.backToSklad = async function(req, res) {
    await Otdel.backToSklad(req.body.data, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}