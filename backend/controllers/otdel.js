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

const all2 = async (req,res) => {
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
}

module.exports.all2 = all2;

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

exports.moveEQ = function(req, res) {
    var data = [];
    Otdel.moveEQ(req.body.data, function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send('MOVE COMPLITE');
    });
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
    var arr;
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


