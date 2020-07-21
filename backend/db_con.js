const conn_str =  ({
    user: 'postgres',
    host: 'localhost',
    database: 'sklad',
    password: 'masterpas',
    port: 5432,
    max: 3
});

const conn_str_download =  ({
    user: 'postgres',
    host: 'localhost',
    database: 'test_sklad',
    password: 'masterpas',
    port: 5432,
    max: 3
});

module.exports.conn_str = conn_str;
module.exports.conn_str_download = conn_str_download;
