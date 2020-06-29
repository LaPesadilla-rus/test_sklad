const Zurnal = require('../models/zurnal.js');

exports.postupl = function(req,res) {
    let out_arr = {
        data: [],
        name: [],
    },
    arr = {
        date: [],
        name: []
    };
    i = 0;
    Zurnal.postupl(req.body.data,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        docs.rows.map( row => {
            arr.date.push(row.si_date);
            arr.name.push(row.si_eq_id);
            
        });
        out_arr.param = ['Дата', 'Наименование'];
        out_arr.data.push(arr.date);
        out_arr.data.push(arr.name)
        console.log(out_arr);
        res.send(docs.rows);
    })
}