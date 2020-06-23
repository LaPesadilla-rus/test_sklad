let conn_str =  ({
    user: 'postgres',
    host: 'localhost',
    database: 'sklad',
    password: 'masterpas',
    port: 5432,
    max: 3
});

function test () {
    
}

module.exports.conn_str = conn_str;

module.exports.test = test;