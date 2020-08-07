var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var app = express();

const server = http.createServer(app);
//middleware
app.use(cors());

//body-parser
app.use(bodyParser.json());

// variables to declare the routes
const user = require('./Routes/user');


//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/demo');

//on successful connection
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb!!');
});

//on error
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in db is :' + err);
    }
});

//port no
const port = 5000;


//routes
app.use('/user', user);

server.listen(port, () => {
    console.log('server started at port number :' + port);
});