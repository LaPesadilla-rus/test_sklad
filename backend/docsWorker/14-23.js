exports.file_14_23 = function (data, req, docNum, res) {
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
            ws.getCell(n,9).value = row.sp_amount;

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
        
        workbook.xlsx.writeFile('./docs/test10.xlsx').then( () => {
                res.download('./docs/test10.xlsx')
            }
        );
    });

    

}