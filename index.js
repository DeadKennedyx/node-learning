const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require('./routes');


const app = express();


app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
}))
app.use('/', routes);

app.listen(3001);
