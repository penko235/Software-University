const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 8888,
        dbUrl: 'mongodb://localhost:27017/',
        cookie: 'x-auth-token',
        secret: 'shhhhaNO'
    },
    production: {}
};

module.exports = config[env];
