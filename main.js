const express = require('express');
const app = express();

const sessions = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// กำหนดเส้นทาง

const index_r = require('./routes/index');
const user_r = require('./routes/user');
const store_r = require('./routes/store');
const backend_r = require('./routes/backend');

app.use(express.static("./public"));
app.use(cookieParser());
// -------
app.use(sessions({
    secret: '=_oprcrinzcsnaff',
    saveUninitialized: true,
    cookie: {maxAge: 3600 * 24 * 1000},
    resave: false
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', index_r);
app.use('/user', user_r);
app.use('/store', store_r);
app.use('/backend', backend_r);
 
app.listen(80, ()=>{
    console.log('ok on 80');
}) ;