const Otdel = require('../models/otdel.js');

exports.all = function(req, res) {
    var data = [];
    Otdel.otd_name( function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data = { otd: docs.rows };
        //res.send(data);
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
};

/*const all2 = async (req,res) => {
    var data = [];
    var c = [];
    //var c = await Otdel.otd_name2();
    //console.log('1')
    try{
        c = '1'
        console.log(c)
        c = [];
        c = await Otdel.otd_name2().then(console.log);
        console.log(c)
        console.log(Otdel.otd_name2())
        c ='2';
        console.log(c)
    }catch (e){
        console.log(e)
    }
   
    //console.log('2')
    
    res.sendStatus(200)
}*/

//module.exports.all2 = all2;

/*docs.rows.forEach(row => {
            //console.log(row.bl_otd_id)
            Otdel.mol_name(row.bl_otd_id,function(err,docs){
                if(err){
                    console.log(err);
                    return res.sendStatus(500);
                }
                data = {...data, otd: {mol: docs.rows}}
            });
            
        })*/
        /*Otdel.mol_name('1',function(err,docs){
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            data = {...data, mol: docs.rows}
            
            Otdel.all(function(err,docs){
                if(err){
                    console.log(err);
                    return res.sendStatus(500);
                }
                data = {...data, items:  docs.rows}
                res.send(data);
            })
        })*/

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
    var data = [];
    await Otdel.moveEQ(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    await Otdel.moveEqLog(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    res.send('MOVE COMPLITE');
};

exports.all2 = async function(req, res) {
    var data = [];
    var mol_data;
    var equip_data;
    var otd_equip;
    var out_equip;
    var docs = {}; 

    data = await Otdel.otd_data_otd1();
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

exports.spisat = async function(req, res) {
    let docNum;
    var data = req.body.data;
    await Otdel.spisatDocNum(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (docs.rows[0].max == null){
            docNum = docs.rows[0].max;
        }else{
            docNum = docs.rows[0].max + 1;
        }
        
    });
    console.log(docNum)
    await Otdel.spisatInsert(docNum, req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (docs.rows.max == null){
            docNum = 1;
        }else{
            docNum = docs.rows.max;
        }
        
    });
    const Excel = require('exceljs');
    let rows;
    const border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'},
        height: 25,
    };
    const top = {
        top: {style:'thin'},
    }
    const alligment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('./docs/14-23.xlsx').then(function(){
        var ws = workbook.getWorksheet(1);
        ws.getCell(11,6).value = req.body.data.mol_name;
        ws.getCell(7,1).value = ws.getCell(7,1).value + ' ' + docNum;

        ws.getCell(20,1).value = '1';
        ws.getCell(20,2).value = data.osn_upload[0].equip_text;
        ws.getCell(20,5).value = data.osn_upload[0].bl_inv_num;
        ws.getCell(20,7).value = data.osn_upload[0].un_name;
        ws.getCell(20,9).value = '1';

        var n = 25,
        i = 1;
        data.dop_upload.forEach(row => {
            rows = ws.getRow(n);
            rows.height = 40;
            rows.commit();
            ws.mergeCells(n,2,n,4);
            ws.mergeCells(n,5,n,6);
            ws.mergeCells(n,7,n,8);

            ws.getCell(n,1).value = i;
            ws.getCell(n,2).value =row.equip_text;
            ws.getCell(n,5).value = row.bl_inv_num;
            ws.getCell(n,7).value = row.un_name;
            ws.getCell(n,9).value = '1';

            ws.getCell(n,1).border = border;
            ws.getCell(n,2).border = border;
            ws.getCell(n,5).border = border;
            ws.getCell(n,7).border = border;
            ws.getCell(n,9).border = border;

            ws.getCell(n,1).alignment = alligment;
            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,5).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            ws.getCell(n,9).alignment = alligment;

            
            n ++;
            i++;
        });
        n = n +2;
        ws.mergeCells(n,1,n,9);
        ws.getCell(n,1).value = 'ФИО и подписи, ответственных за установку материальной ценности:';

        n = n + 2;
        for(var a = 0; a < 4; a++){
            if (n === 38){
                n++;
            }
            if (n === 37){
                n++;
            }
            ws.mergeCells(n,2,n,3);
            ws.mergeCells(n,7,n,8);
            ws.getCell(n,2).value = "____________";
            ws.getCell(n,7).value = "____________";
            n++;
            ws.mergeCells(n,2,n,3);
            ws.mergeCells(n,7,n,8);
            ws.getCell(n,2).value = "(подпись)";
            ws.getCell(n,7).value = "(ФИО)";

            ws.getCell(n,1).alignment = alligment;
            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,5).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            ws.getCell(n,9).alignment = alligment;

            //ws.getCell(n,2).border = top;
            //ws.getCell(n,7).border = top; //БАГАЕТ!!!!
            n++;
        }
        
        workbook.xlsx.writeFile('./docs/test10.xlsx').then(function(){
            res.download('./docs/test10.xlsx');
        });
    });

    

    //res.send('Complite');
}


