const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const controllers = require('./controllers');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());

app.use(controllers);

module.exports = app;
