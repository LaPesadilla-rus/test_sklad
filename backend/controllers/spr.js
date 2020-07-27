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

exports.equip_name = function(req, res) {
    Spr.equip_name(function(err, docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(docs.rows);
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
            res.send(err);
        }
        res.send(docs);
    })
}

exports.equip = function(req, res) {
    Spr.equip(req, function(err,docs){
        if (err) {
            console.log('Error CODE: ' + err.code);
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.equip_all = function(req, res) {
    Spr.equip_all(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.equip_fullname = function(req, res) {
    Spr.equip_fullname(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.equip_update = function(req, res) {
    Spr.equip_update(req, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.newUser = function(req, res) {
    Spr.newUser(req, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.updUser = function(req, res) {
    Spr.updUser(req.body.data, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.watch = function(req, res) {
    Spr.watch(req, function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs.rows);
    })
}

exports.relation_add = function(req, res) {
    Spr.relation_add(req, function(err,docs){
        if (err) {
            console.log("Postgres INSERT error:", err.code);
            if (err.code === '23505'){
                res.send('Связь уже существует!');
            }else{
                res.send("Postgres INSERT error:", err.code);
            }
        }else{
            res.send('Связь успешно создана');
        }
        
    })
}

exports.filterData = async function(req, res) {
    let data = {};
    await Spr.kat( function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.kat = docs.rows;
    });
    await Spr.equip_name( function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        let arr = []
        docs.rows.map(row => {
            arr.push(row.eq_name)
        })
        data.equip_name = arr;
    });
    await Spr.marka( function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.marka = docs.rows;
    });
    await Spr.type( function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        data.type = docs.rows;
    });
    //console.log(data)
    res.send(data)
}

exports.userList = function(req, res) {
    Spr.userList(function(err,docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}