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


