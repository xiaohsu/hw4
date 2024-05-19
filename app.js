var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/sqlite.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});
app.post('/api/soy', (req, res)=>{
    const date_value = req.body.date;
    db.all('SELECT * FROM soy_flour WHERE date = ?', date_value, (err, rows) => {
        if(err) {
            res.status(500).json({error:err.message});
            return;
        }
        res.json(rows);
    });
});
app.get('/api/allcost', (req, res) => {
    db.all('SELECT * FROM soy_flour', (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.json(rows);
    });
});
module.exports = app;
