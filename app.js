const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const userRouter = require('./routes/user');
const signupRouter = require('./routes/signup');

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/login.html', userRouter);
app.use('/signup.html', signupRouter);

module.exports = app;
