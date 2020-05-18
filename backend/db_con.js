let conn_str =  ({
    user: 'postgres',
    host: 'localhost',
    database: 'sklad',
    password: 'masterkey',
    port: 5432,
    max: 3
});

module.exports.conn_str = conn_str;