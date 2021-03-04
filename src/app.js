const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { static } = require('express');

const app = express();


//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ //motor de plantilla po defecto
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs'); // para poder utilizar el motor creado

//funciones intermedias
app.use(morgan('dev')); // modo de desarrollo
app.use(express.urlencoded({ extends: false })); // utilización de datos en json

//rutas
app.use(require('./routes/index'));

//archivos estaticos
app.set(static(path.join(__dirname, 'public')));

module.exports = app;