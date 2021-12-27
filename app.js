const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const affecte = require('./routes/affecte');
const bataille = require('./routes/bataille');
const blesse = require('./routes/blesse');
const blessure = require('./routes/blessure');
const grade = require('./routes/grade');
const promu = require('./routes/promu');
const soldat = require('./routes/soldat');
const unite = require('./routes/unite');


const app = express();

const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Base de donnée connectée...");
    })
    .catch(err => {
        console.log("Souci de connexion détectée", err);
        process.exit();
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);

app.use('/affecte', affecte, function(req, res, next) {
    
});
app.use('/bataille', bataille);
app.use('/blesse', blesse);
app.use('/blessure', blessure);
app.use('/grade', grade);
app.use('/promu', promu);
app.use('/soldat', soldat);
app.use('/unite', unite);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
