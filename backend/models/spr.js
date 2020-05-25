const {Pool, Client} = require('pg');

const conn = require('../db_con.js');

const pool = new Pool (conn.conn_str);

const client = new Client(conn.conn_str);
client.connect();

var errm = {};
var mas = [{main: {}}];

exports.all = function (cb) {
    client.query(`SELECT kat_id as id, kat_name as item FROM kategor_spr order by item`
    , (err, res) => {
        errm = {err: err};
        mas = [{item: res.rows, name: 'Категория', table:'kategor_spr'}];
    });
    client.query(`SELECT te_id as id, te_name as item FROM type_equip_spr  order by item`
    , (err, res) => {
        errm = {...errm, err: err};
        mas = [...mas, {item: res.rows, name: 'Тип обоудования', table:'type_equip_spr'}];
    });
    client.query(`SELECT ma_id as id, ma_name as item FROM marka_equip_spr  order by item`
    , (err, res) => {
        errm = {...errm, err: err};
        mas = [...mas, {item: res.rows, name: 'Марка', table:'marka_equip_spr'}];
    });
    client.query(`SELECT pr_id as id, pr_name as item FROM provider_spr  order by item`
    , (err, res) => {
        errm = {...errm, err: err};
        mas = [...mas, {item: res.rows, name: 'Поставщик', table:'provider_spr'}];
    });
    client.query(`SELECT fi_id as id, fi_name as item FROM filial_spr  order by item`
    , (err, res) => {
        errm = {...errm, err: err};
        mas = [...mas, {item: res.rows, name: 'Филиал', table:'filial_spr'}];
    });
    client.query(`SELECT un_id as id, un_name as item FROM units_spr  order by item`
    , (err, res) => {
        errm = {...errm, err: err};
        mas = [...mas,{item: res.rows, name: 'Ед. измерения', table:'units_spr'}];
    });
    client.query(`SELECT mo_id as id, mo_name as item FROM mol_spr  order by item`
    , (err, res) => {
        errm = {...errm, err: err};
        mas = [...mas,{item: res.rows, name: 'МОЛ', table:'mol_spr'}];
    });
    client.query(`SELECT eq.eq_id as id,
                (te.te_name || ' ' || ma.ma_name || ' '|| eq.eq_name) as item
                FROM equip_spr eq
                
                inner join marka_equip_spr ma
                on ma.ma_id = eq.eq_mark_id
                
                inner join type_equip_spr te
                on te.te_id = eq_type_id`
    , (err, res) => {
        errm = {...errm, err: err};
        mas = [...mas,{item: res.rows, name: 'Оборудование', table:'equip_spr', type:'equip'}];
    });
    client.query(`SELECT ot_id as id, ot_name as item FROM otd_spr  order by item`
    , (err, res) => {
        errm = {...errm, err: err};
        mas = [...mas,{item: res.rows, name: 'Отдел', table:'otd_spr'}];
        cb(errm,mas);
    });
};

exports.kat = function (cb) {
    pool.query(`SELECT * FROM kategor_spr`
    , (err,res)=>{
       cb(err,res);
    });
}

exports.spr_save = function(req,cb) {
    if(!req.body.data) return res.sendStatus(400);
    var sql = `INSERT INTO public.units_spr (un_name)
                VALUES ('`+req.body.data.item+`');`;
    switch(req.body.data.table) {
        case 'units_spr': sql =  `INSERT INTO public.units_spr (un_name)
                                    VALUES ('`+req.body.data.item+`')`;
                                    break;
        case 'provider_spr': sql =  `INSERT INTO public.provider_spr (pr_name)
                                    VALUES ('`+req.body.data.item+`')`;
                                    break;
        case 'filial_spr': sql =  `INSERT INTO public.filial_spr (fi_name)
                                    VALUES ('`+req.body.data.item+`')`;
                                    break;
        case 'kategor_spr': sql =  `INSERT INTO public.kategor_spr (kat_name)
                                    VALUES ('`+req.body.data.item+`')`;
                                    break;
        case 'marka_equip_spr': sql =  `INSERT INTO public.marka_equip_spr (ma_name)
                                    VALUES ('`+req.body.data.item+`')`;
                                    break;
        case 'otd_spr': sql =  `INSERT INTO public.otd_spr (ot_name)
                                    VALUES ('`+req.body.data.item+`')`;
                                    break;
        case 'type_equip_spr': sql =  `INSERT INTO public.type_equip_spr (te_name)
                                    VALUES ('`+req.body.data.item+`')`;
                                    break;
        case 'mol_spr': sql =  `INSERT INTO public.mol_spr (mo_name)
                                    VALUES ('`+req.body.data.item+`')`;
                                    break;
        default: res.send('INSERT COMPLITE');
    }
    if (sql){
        pool.query(sql
            , (err,res)=>{
                if (err) {
                    console.log("Postgres INSERT error:", err);
                }else{
                    cb(err,'POST COMPLITE');
                }
            });
    } 
}

exports.spr_update = function(req,cb) {
    var sql;
    if(!req.body.data) return res.sendStatus(400);
    switch(req.body.data.table) {
        case 'units_spr': sql =  `UPDATE public.units_spr
                                    SET un_name ='`+req.body.data.item+`'
                                    WHERE un_id = `+req.body.data.id_item+``;
                                    break;
        case 'provider_spr': sql =  `UPDATE public.provider_spr
                                    SET pr_name ='`+req.body.data.item+`'
                                    WHERE pr_id = `+req.body.data.id_item+``;
                                    break;
        case 'filial_spr': sql =  `UPDATE public.filial_spr
                                    SET fi_name ='`+req.body.data.item+`'
                                    WHERE fi_id = `+req.body.data.id_item+``;
                                    break;
        case 'kategor_spr': sql =  `UPDATE public.kategor_spr
                                    SET kat_name ='`+req.body.data.item+`'
                                    WHERE kat_id = `+req.body.data.id_item+``;
                                    break;
        case 'marka_equip_spr': sql =  `UPDATE public.marka_equip_spr
                                    SET ma_name ='`+req.body.data.item+`'
                                    WHERE ma_id = `+req.body.data.id_item+``;
                                    break;
        case 'otd_spr': sql =  `UPDATE public.otd_spr
                                    SET ot_name ='`+req.body.data.item+`'
                                    WHERE ot_id = `+req.body.data.id_item+``;
                                    break;
        case 'type_equip_spr': sql =  `UPDATE public.type_equip_spr
                                    SET te_name ='`+req.body.data.item+`'
                                    WHERE te_id = `+req.body.data.id_item+``;
                                    break;
        case 'mol_spr': sql =  `UPDATE public.mol_spr
                                    SET mo_name ='`+req.body.data.item+`'
                                    WHERE mo_id = `+req.body.data.id_item+``;
                                    break;
        default: cb('','POST COMPLITE');
    }
    if (sql){
        pool.query(sql
            , (err,res)=>{
                if (err) {
                    console.log("Postgres INSERT error:", err);
                }else{
                    cb(err,'UPDATE COMPLITE');
                }
            });
    }
}

exports.spr_delete = function(req,cb) {
    var sql;
    if(!req.body) return res.sendStatus(400);
    switch(req.body.table) {
        case 'units_spr': sql =  `DELETE FROM public.units_spr
                                    WHERE un_id = `+req.body.id_item+``;
                                    break;
        case 'provider_spr': sql =  `DELETE FROM public.provider_spr
                                    WHERE pr_id = `+req.body.id_item+``;
                                    break;
        case 'filial_spr': sql =  `DELETE FROM public.filial_spr
                                    WHERE fi_id = `+req.body.id_item+``;
                                    break;
        case 'kategor_spr': sql =  `DELETE FROM public.kategor_spr
                                    WHERE kat_id = `+req.body.id_item+``;
                                    break;
        case 'marka_equip_spr': sql =  `DELETE FROM public.marka_equip_spr
                                    WHERE ma_id = `+req.body.id_item+``;
                                    break;
        case 'otd_spr': sql =  `DELETE FROM public.otd_spr
                                    WHERE ot_id = `+req.body.id_item+``;
                                    break;
        case 'type_equip_spr': sql =  `DELETE FROM public.type_equip_spr
                                    WHERE te_id = `+req.body.id_item+``;
                                    break;
        case 'mol_spr': sql =  `DELETE FROM public.mol_spr
                                    WHERE mo_id = `+req.body.id_item+``;
                                    break;
        case 'equip_spr': sql =  `DELETE FROM public.equip_spr
                                    WHERE eq_id = `+req.body.id_item+``;
                                    break;
        default: res.send('POST COMPLITE');
    }
    if (sql){
        pool.query(sql
            , (err,res)=>{
                if (err) {
                    console.log("Postgres DELETE error:", err);
                }else{
                    cb(err, 'DELETE COMPLITE');
                }
            });
    }
}

exports.equip = function(id, cb) {
    var sql = `SELECT * FROM public.equip_spr WHERE eq_id = `+id+``;
    pool.query(sql 
        ,(err,res)=>{
            cb(err,res);
        });
}

exports.equip_update = function(req, cb) {
    var sql =  `UPDATE public.equip_spr
                SET eq_name ='`+req.body.data.name+`',
                    eq_type_id = `+req.body.data.type+`,
                    eq_mark_id = `+req.body.data.marka+`,
                    eq_kat_id =  `+req.body.data.kat+`
                WHERE eq_id = `+req.body.data.id_item+``;
    pool.query(sql 
        ,(err,res)=>{
            cb(err,'UPDATE COMPLITE');
        });
}