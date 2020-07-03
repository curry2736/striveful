if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const signup = require('./routes/signup');
const login = require('./routes/login');
const auth = require('./routes/auth');
const test = require('./routes/test');
const details = require('./routes/details');
const indexRouter = require('./routes/index')
const company = require('./routes/company');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const methodOverride = require('method-override')
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');

const search = require('./routes/search')




if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined.');
  process.exit(1);
}

app.use(methodOverride('_method'))

app.use(express.json());
app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', error => {
    console.error(error)
});
db.once('open', () => {
    console.log('Connected to Mongoose')
});

app.use('/', indexRouter)
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/login123', login);
app.use('/signup', signup);
app.use('/test', test);
app.use('/search', search);
app.use('/company', company)
app.use('/details', details);


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
