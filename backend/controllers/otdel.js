const Otdel = require('../models/otdel.js');

exports.all = async function(req, res) {
    var data = [];
    Otdel.otd_name(function(err, docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data = { otd: docs.rows};
        docs.rows.forEach(row => {
            //console.log(row.bl_otd_id)
            Otdel.mol_name(row.bl_otd_id,function(err,docs){
                if(err){
                    console.log(err);
                    return res.sendStatus(500);
                }
                data = {...data, otd: {mol: docs.rows}}
            });
            
        })
         
        
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
    });
    await res.send(data)
    
};