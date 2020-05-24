const Spr = require('../models/spr.js');

exports.all = function(req, res) {
    Spr.all(function(err, docs){
        if (err.err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(docs);
    })
};

exports.kat = function(req, res) {
    Spr.kat(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json({item: docs.rows, name: 'Категория', ref: 'kat'});
    })
}

exports.spr_save = function(req, res) {
    Spr.spr_save(req, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.spr_update = function(req, res) {
    Spr.spr_update(req, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.spr_delete = function(req, res) {
    Spr.spr_delete(req, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}