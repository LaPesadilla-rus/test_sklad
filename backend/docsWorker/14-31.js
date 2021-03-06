exports.file_14_31 = function (data, req, docNum, res) {
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

    console.log(data)

    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('./docs/14-31.xlsx').then(function(){
        var ws = workbook.getWorksheet(1);
        n=13
        ws.mergeCells(n,2,n,7);
        ws.getCell(n,2).value = req.body.data.us;
        n=15
        ws.mergeCells(n,2,n,7);
        ws.getCell(n,2).value = req.body.data.us_s;
        var n = 20;
        ws.getCell(11,10).value = req.body.data.ot_name;
        ws.getCell(7,1).value = ws.getCell(7,1).value + ' ' + docNum;
        rows = ws.getRow(n);
        rows.height = 38;
        rows.commit();
        i=1
        data.dop_upload.forEach(row => {

            rows = ws.getRow(n);
            rows.height = 38;
            rows.commit();
            ws.mergeCells(n,2,n,4);
            ws.mergeCells(n,5,n,6);
            ws.mergeCells(n,7,n,9);
            ws.mergeCells(n,10,n,11);

            ws.getCell(n,1).value = i;
            ws.getCell(n,2).value =row.equip_text;
            ws.getCell(n,5).value = row.bl_inv_num;
            ws.getCell(n,7).value = row.un_name;
            ws.getCell(n,10).value = row.sp_amount;

            ws.getCell(n,1).border = border;
            ws.getCell(n,2).border = border;
            ws.getCell(n,5).border = border;
            ws.getCell(n,7).border = border;
            ws.getCell(n,10).border = border;

            ws.getCell(n,1).alignment = alligment;
            ws.getCell(n,2).alignment = alligment;
            ws.getCell(n,5).alignment = alligment;
            ws.getCell(n,7).alignment = alligment;
            ws.getCell(n,10).alignment = alligment;

            n ++;
            i++;
        });

        n = n + 2;
        ws.mergeCells(n,1,n,6);
        ws.mergeCells(n,7,n,10);
        ws.getCell(n,7).value = req.body.data.neof_name;
        ws.getCell(n,1).value = 'Было сформировано основное средство: ';
        n++;
       
        n = n + 1
        ws.mergeCells(n,1,n,6);
        ws.mergeCells(n,7,n,10);
        ws.getCell(n,7).value = req.body.data.new_inv_nb;
        ws.getCell(n,1).value = 'Новый инвентарный номер: ';
       
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
        let fileName = '14-31_' + docNum + '.xlsx'
        workbook.xlsx.writeFile('./docs/archive/14-31/' + fileName).then(function(){
            res.download('./docs/archive/14-31/' + fileName);
        });
    });
}