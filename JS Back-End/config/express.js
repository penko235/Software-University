const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

module.exports = (app) => {

    app.engine('hbs', handlebars({
        layoutsDir: 'views',
        defaultLayout: 'base-layout',
        partialsDir: 'views/partials',
        extname: 'hbs'
    }));

    app.use(express.static('static'));
    app.set('view engine', 'hbs');
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: false }))

}
