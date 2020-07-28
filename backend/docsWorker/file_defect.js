exports.file_defect = function (data, req, docNum, res) {
    console.log(data)
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
    workbook.xlsx.readFile('./docs/defect.xlsx').then(function(){
        var ws = workbook.getWorksheet(1);
        var n = 20;
        ws.getCell(13,5).value = data.ot_name;
        ws.getCell(15,4).value = data.dop_upload[0].equip_name;
        ws.getCell(17,4).value = data.dop_upload[0].bl_inv_num;
        ws.getCell(19,5).value = data.dateExp;
        ws.getCell(21,4).value = data.dateRazn;
        ws.getCell(23,6).value = data.mol_name;

        
        n = 29;

        rows = ws.getRow(n);
        rows.height = 38;
        rows.commit();

        rows = ws.getRow(n);
        console.log(data.defTxt.length)
        let hight = ((data.defTxt.length / 38) + 1) * 38;
        rows.height = hight;
        rows.commit();

        ws.mergeCells(n,1,n,3);
        ws.mergeCells(n,4,n,6);
        ws.mergeCells(n,7,n,8);

        ws.getCell(n,1).value = data.defTxt;
        ws.getCell(n,4).value = data.zakTxt;

        ws.getCell(n,1).border = border;
        ws.getCell(n,4).border = border;
        ws.getCell(n,7).border = border;
        ws.getCell(n,9).border = border;

        ws.getCell(n,1).alignment = alligment;
        ws.getCell(n,4).alignment = alligment;
        ws.getCell(n,7).alignment = alligment;
        ws.getCell(n,9).alignment = alligment;

        n = n + 2;
        for(var a = 0; a < 3; a++){
            ws.mergeCells(n,1,n,5);
            ws.mergeCells(n,6,n,7);
            ws.mergeCells(n,8,n,9);
            ws.getCell(n,1).value = "____________";
            ws.getCell(n,6).value = "____________";
            ws.getCell(n,8).value = "____________";
            ws.getCell(n,1).alignment = alligment;
            ws.getCell(n,6).alignment = alligment;
            ws.getCell(n,8).alignment = alligment;
            n++;
            ws.mergeCells(n,1,n,5);
            ws.mergeCells(n,6,n,7);
            ws.mergeCells(n,8,n,9);
            ws.getCell(n,1).value = "(должность)";
            ws.getCell(n,6).value = "(подпись)";
            ws.getCell(n,8).value = "(расшифровка подписи)";

            ws.getCell(n,1).alignment = alligment;
            ws.getCell(n,6).alignment = alligment;
            ws.getCell(n,8).alignment = alligment;
            n++;
        }
        //ws.getCell(20,5).value = data.osn_upload[0].bl_inv_num;
        //ws.getCell(20,7).value = data.osn_upload[0].un_name;
        //ws.getCell(20,9).value = '1';
        //ws.getCell(11,6).value = req.body.data.mol_name;
        //ws.getCell(7,1).value = ws.getCell(7,1).value + ' ' + docNum;

        /*rows = ws.getRow(n);
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
        i = 1;*/
        /*data.dop_upload.forEach(row => {
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
        }*/
        let fileName = 'defect_' + docNum + '.xlsx' 
        workbook.xlsx.writeFile('./docs/archive/defect/'+fileName).then( () => {
                res.download('./docs/archive/defect/'+fileName)
            }
        );
    });

    

}