const Otdel = require('../models/otdel.js');
const Hyst = require('../models/hyst.js');

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
    console.log(req.body.data)
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
    Hyst.Move(req.body.data, req.headers.us_id, function (err, docs) {
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
    //console.log(mol_data);
    /*for(var i = 0; i < docs.otd_data.length; i++){
        //console.log(docs.otd_data[i])
        if (docs.otd_data[i].otd_equip.length === 0){
            
        }
    }*/
    //docs.otd_data[1].splice(i,1);
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
    //return res.sendStatus(200)
    
    await Hyst.spisatHystory(docNum, req.body.data, req.headers.us_id, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    const Excel = require('exceljs');
    let rows;
    const border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'},
    };
    const top = {
        top: {style:'thin'},
    }
    const alligment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('./docs/14-23_mk3.xlsx').then(function(){
        var ws = workbook.getWorksheet(1);
        var n = 20;
        ws.getCell(11,6).value = req.body.data.mol_name;
        ws.getCell(7,1).value = ws.getCell(7,1).value + ' ' + docNum;

        rows = ws.getRow(n);
        rows.height = 38;
        rows.commit();

        ws.mergeCells(n,2,n,4);
        ws.mergeCells(n,5,n,6);
        ws.mergeCells(n,7,n,8);

        ws.getCell(20,1).value = '1';
        ws.getCell(20,2).value = data.osn_upload[0].equip_text;
        ws.getCell(20,5).value = data.osn_upload[0].bl_inv_num;
        ws.getCell(20,7).value = data.osn_upload[0].un_name;
        ws.getCell(20,9).value = '1';

        ws.getCell(20,1).border = border;
        ws.getCell(20,2).border = border;
        ws.getCell(20,5).border = border;
        ws.getCell(20,7).border = border;
        ws.getCell(20,9).border = border;

        ws.getCell(20,1).alignment = alligment;
        ws.getCell(20,2).alignment = alligment;
        ws.getCell(20,5).alignment = alligment;
        ws.getCell(20,7).alignment = alligment;
        ws.getCell(20,9).alignment = alligment;

        n = 25,
        i = 1;
        data.dop_upload.forEach(row => {
            rows = ws.getRow(n);
            rows.height = 38;
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
            ws.mergeCells(n,2,n,3);
            ws.mergeCells(n,7,n,8);
            ws.getCell(n,2).value = "____________";
            ws.getCell(n,7).value = "____________";
            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            n++;
            ws.mergeCells(n,2,n,3);
            ws.mergeCells(n,7,n,8);
            ws.getCell(n,2).value = "(подпись)";
            ws.getCell(n,7).value = "(ФИО)";

            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            n++;
        }
        
        workbook.xlsx.writeFile('./docs/test10.xlsx').then(function(){
            res.download('./docs/test10.xlsx');
        });
    });

    

    //res.send('Complite');
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
    const Excel = require('exceljs');
    let rows;
    const border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'},
    };
    const top = {
        top: {style:'thin'},
    }
    const alligment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('./docs/14-27.xlsx').then(function(){
        var ws = workbook.getWorksheet(1);
        var n = 20;
        ws.getCell(11,6).value = req.body.data.mol_name;
        ws.getCell(7,1).value = ws.getCell(7,1).value + ' ' + docNum;

        rows = ws.getRow(n);
        rows.height = 38;
        rows.commit();

        ws.mergeCells(n,2,n,4);
        ws.mergeCells(n,5,n,6);
        ws.mergeCells(n,7,n,8);

        ws.getCell(20,1).value = '1';
        ws.getCell(20,2).value = data.osn_upload[0].equip_text;
        ws.getCell(20,5).value = data.osn_upload[0].bl_inv_num;
        ws.getCell(20,7).value = data.osn_upload[0].un_name;
        ws.getCell(20,9).value = '1';

        ws.getCell(20,1).border = border;
        ws.getCell(20,2).border = border;
        ws.getCell(20,5).border = border;
        ws.getCell(20,7).border = border;
        ws.getCell(20,9).border = border;

        ws.getCell(20,1).alignment = alligment;
        ws.getCell(20,2).alignment = alligment;
        ws.getCell(20,5).alignment = alligment;
        ws.getCell(20,7).alignment = alligment;
        ws.getCell(20,9).alignment = alligment;

        n = 25,
        i = 1;
        data.dop_upload.forEach(row => {
            rows = ws.getRow(n);
            rows.height = 38;
            rows.commit();
            ws.mergeCells(n,2,n,6);
            ws.mergeCells(n,7,n,8);

            ws.getCell(n,1).value = i;
            ws.getCell(n,2).value = row.te_name;
            ws.getCell(n,7).value = row.un_name;
            ws.getCell(n,9).value = '1';

            ws.getCell(n,1).border = border;
            ws.getCell(n,2).border = border;
            ws.getCell(n,7).border = border;
            ws.getCell(n,9).border = border;

            ws.getCell(n,1).alignment = alligment;
            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            ws.getCell(n,9).alignment = alligment;

            n ++;
            i++;
        });
        n = n + 2;
        ws.mergeCells(n,1,n,9);
        ws.getCell(n,1).value = 'на следующую материальную ценность: ';
        n++;

        rows = ws.getRow(n);
        rows.height = 38;
        rows.commit();
        ws.mergeCells(n,2,n,4);
        ws.mergeCells(n,5,n,6);
        ws.mergeCells(n,7,n,8);

        ws.getCell(n,1).value = '№ п/п';
        ws.getCell(n,2).value = 'Наименование МЦ';
        ws.getCell(n,5).value = "Инвентарный номер";
        ws.getCell(n,7).value = "Единицы измерения";
        ws.getCell(n,9).value = "Количество";

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
        n++;
        i = 1;
        //--
        data.dop_upload.forEach(row => {
            rows = ws.getRow(n);
            rows.height = 38;
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
            ws.mergeCells(n,2,n,3);
            ws.mergeCells(n,7,n,8);
            ws.getCell(n,2).value = "____________";
            ws.getCell(n,7).value = "____________";
            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            n++;
            ws.mergeCells(n,2,n,3);
            ws.mergeCells(n,7,n,8);
            ws.getCell(n,2).value = "(подпись)";
            ws.getCell(n,7).value = "(ФИО)";

            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            n++;
        }
        
        workbook.xlsx.writeFile('./docs/test20.xlsx').then(function(){
            res.download('./docs/test20.xlsx');
        });
    });
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
    const Excel = require('exceljs');
    let rows;
    const border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'},
    };
    const top = {
        top: {style:'thin'},
    }
    const alligment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('./docs/14-29.xlsx').then(function(){
        var ws = workbook.getWorksheet(1);
        var n = 20;
        ws.getCell(11,6).value = req.body.data.mol_name;
        ws.getCell(7,1).value = ws.getCell(7,1).value + ' ' + docNum;

        rows = ws.getRow(n);
        rows.height = 38;
        rows.commit();

        ws.mergeCells(n,2,n,4);
        ws.mergeCells(n,5,n,6);
        ws.mergeCells(n,7,n,8);

        ws.getCell(20,1).value = '1';
        ws.getCell(20,2).value = data.osn_upload[0].equip_text;
        ws.getCell(20,5).value = data.osn_upload[0].bl_inv_num;
        ws.getCell(20,7).value = data.osn_upload[0].un_name;
        ws.getCell(20,9).value = '1';

        ws.getCell(20,1).border = border;
        ws.getCell(20,2).border = border;
        ws.getCell(20,5).border = border;
        ws.getCell(20,7).border = border;
        ws.getCell(20,9).border = border;

        ws.getCell(20,1).alignment = alligment;
        ws.getCell(20,2).alignment = alligment;
        ws.getCell(20,5).alignment = alligment;
        ws.getCell(20,7).alignment = alligment;
        ws.getCell(20,9).alignment = alligment;

        n = 25,
        i = 1;
        data.dop_upload.forEach(row => {
            rows = ws.getRow(n);
            rows.height = 38;
            rows.commit();
            ws.mergeCells(n,2,n,6);
            ws.mergeCells(n,7,n,8);

            ws.getCell(n,1).value = i;
            ws.getCell(n,2).value = row.te_name;
            ws.getCell(n,7).value = row.un_name;
            ws.getCell(n,9).value = '1';

            ws.getCell(n,1).border = border;
            ws.getCell(n,2).border = border;
            ws.getCell(n,7).border = border;
            ws.getCell(n,9).border = border;

            ws.getCell(n,1).alignment = alligment;
            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            ws.getCell(n,9).alignment = alligment;

            n ++;
            i++;
        });
        n = n + 2;
        ws.mergeCells(n,1,n,9);
        ws.getCell(n,1).value = 'на следующий элемент: ';
        n++;

        rows = ws.getRow(n);
        rows.height = 38;
        rows.commit();
        ws.mergeCells(n,2,n,4);
        ws.mergeCells(n,5,n,6);
        ws.mergeCells(n,7,n,8);

        ws.getCell(n,1).value = '№ п/п';
        ws.getCell(n,2).value = 'Наименование МЦ';
        ws.getCell(n,5).value = "Инвентарный номер";
        ws.getCell(n,7).value = "Единицы измерения";
        ws.getCell(n,9).value = "Количество";

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
        n++;
        i = 1;
        //--
        data.dop_upload.forEach(row => {
            rows = ws.getRow(n);
            rows.height = 38;
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
            ws.mergeCells(n,2,n,3);
            ws.mergeCells(n,7,n,8);
            ws.getCell(n,2).value = "____________";
            ws.getCell(n,7).value = "____________";
            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            n++;
            ws.mergeCells(n,2,n,3);
            ws.mergeCells(n,7,n,8);
            ws.getCell(n,2).value = "(подпись)";
            ws.getCell(n,7).value = "(ФИО)";

            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            n++;
        }
        
        workbook.xlsx.writeFile('./docs/test30.xlsx').then(function(){
            res.download('./docs/test30.xlsx');
        });
    });
}

