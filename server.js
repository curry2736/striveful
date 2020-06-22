if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose')
const users = require('./routes/users')
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');


const indexRouter = require('./routes/index')

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.static(__dirname + '/views'));


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', error => {
    console.error(error)
});
db.once('open', () => {
    console.log('Connected to Mongoose')
});

app.use('/', indexRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})