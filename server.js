// Packages
var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config');

// Use body parser to grab information from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \Authorization');
    next();
});

// log requests to console for dev
app.use(morgan('dev'));

// connect to database
mongoose.connect(config.database);

// set static files location for front end
app.use(express.static(__dirname + config.environment));

// register api routes
var apiRoutes = require('./api/routes/routes')(express);
app.use('/api', apiRoutes);

// main route to to send users to front end
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + config.environment + '/index.html'));
});

// start server
app.listen(config.port);
console.log('Magic happens on port ' + config.port);