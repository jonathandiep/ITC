"use strict"

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var mysql = require('mysql');
var path = require('path');
var config = require('./config');

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.mysqldb
});

// use body parser to gram information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// log requests to console
app.use(morgan('dev'));

// connect to database
mongoose.connect(config.mongodb);

// set static files location - used for requests our frontend will make
app.use(express.static(`${__dirname}/public`));

// API routes
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// catchall route (send users to Angular frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port);
console.log(`Working on port ${config.port}`);
