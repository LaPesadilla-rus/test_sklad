const Zauvki = require('../models/zauvki.js');


exports.all_zauvki = function(req,res) {
    Zauvki.all_zauvki(req.body,function(err,docs){
        if (err) {
          //  console.log(err);
            return res.sendStatus(500);
        }
        //console.log(docs.rows);
        res.send(docs);
    })
}

exports.new_zauvka = function(req,res) {
    Zauvki.new_zauvka(req.body,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        //console.log(docs);
        res.send(docs);
    })
}

exports.update_zauvka = function(req,res) {
    Zauvki.update_zauvka(req.body,function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log(docs);
        res.send(docs);
    })
}

exports.delete_zauvka = function(req, res) {
    Zauvki.delete_zauvka(req, function(err,docs){
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.send(docs);
    })
}