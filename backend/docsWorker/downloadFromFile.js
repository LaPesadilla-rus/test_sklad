const Excel = require('exceljs');
const workbook = new Excel.Workbook();
const Restore = require('../models/restore.js');

exports.downlFrFile = async function (req, cb){
    try{
        await workbook.xlsx.readFile('./docs/restore/Сводная по ОС.xlsx').then( async function(){
            var ws = workbook.getWorksheet(1);
            //console.log(ws.columns)
            await Restore.deleteAllBalance(function (err,docs) {
                if (err){
                    console.log(err);
                    return res.sendStatus(500)
                }
               
            });
            console.log('Waite delete balance');
            await sleep(4000);
            console.log('Continue...');
            let i = 2,
                data = {};
            while (ws.getCell(i,5).value !== null){
                //console.log(ws.getCell(i,5).value);
                data.buh_name = ws.getCell(i,5).value;
                data.inv_num = ws.getCell(i,7).value;
                data.ot_name = ws.getCell(i,1).value;
                data.mo_name = ws.getCell(i,2).value;
                if (data.inv_num === null){
                    data.inv_num = ''
                }
                await Restore.otdNewInsert(data, function (err,docs) {
                    if (err){
                        console.log(err);
                        console.log(ws.getCell(i,1).value)
                        return res.sendStatus(500)
                    }
                    data.ot_id = docs;
                });
                await Restore.molNewInsert(data, function (err,docs) {
                    if (err){
                        console.log(err);
                        console.log(ws.getCell(i,2).value)
                        return res.sendStatus(500)
                    }
                    data.mo_id = docs;
                });
                //console.log(data)
                await Restore.insertBalance(data, function (err,docs) {
                    if (err){
                        console.log(err);
                        console.log(ws.getCell(i,5).value)
                        return res.sendStatus(500)
                    }
                })
                i++;
            }
            console.log(i)
            
        })
        console.log('Balance download complite')
        data = {}
        await workbook.xlsx.readFile('./docs/restore/учет_v3_.xlsm').then( async function(){
            var ws = workbook.getWorksheet(4);
            //console.log(ws.columns)
            await Restore.deleteAllStorage(function (err,docs) {
                if (err){
                    console.log(err);
                    return res.sendStatus(500)
                }
               
            });
            
            console.log('Waite delete storage');
            await sleep(4000);
            console.log('Continue...');
            let i = 4,
                data = {};
            while (ws.getCell(i,3).value !== null){
                if (parseInt(ws.getCell(i,6).value) > 0){
                    data.kat_id = ws.getCell(i,2).value;
                    data.inv_num = ws.getCell(i,3).value;
                    data.buh_name = ws.getCell(i,4).value;
                    data.un_name = ws.getCell(i,5).value;
                    data.amount = ws.getCell(i,6).value;
                    data.prim = ws.getCell(i,7).value;
                    if (data.prim === null){
                        data.prim = ''
                    }
                    if (data.un_name === 'шт'){
                        data.un_id = 0;
                    }else{
                        data.un_id = 1;
                    }
                    /*if (data.kat === 'Основные Средства'){
                        data.kat_id = 0
                    }
                    if (data.kat === 'картриджи'){
                        data.kat_id = 2
                    }
                    if (data.kat === 'запчасти'){
                        data.kat_id = 1
                    }*/
                    await Restore.insertStorage(data, function (err,docs) {
                        if (err){
                            console.log(err);
                            console.log(ws.getCell(i,1).value)
                            return res.sendStatus(500)
                        }
                        data.ot_id = docs;
                    });
                }
               
                i++;
            }
            console.log(i)
            
        })

        cb('','Download complite')
    }catch (err){
        cb(err,'');
    }
    
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }