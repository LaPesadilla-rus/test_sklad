const rc = require('rc');

module.exports = rc ('JWT', {
    port: process.env.PORT || 4000,
    connection: './data',
    secret: 'ShityPassword',
});