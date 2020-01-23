const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const userRouter = require('./routes/user');
const signupRouter = require('./routes/signup');
const homeRouter = require('./routes/home');
const accountRouter = require('./routes/account');
const stocksRouter = require('./routes/stocks');
const partyRouter = require('./routes/party');
const aboutusRouter = require('./routes/aboutus');
const helpRouter = require('./routes/help');

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/login.html', userRouter);
app.use('/signup.html', signupRouter);
app.use('/home', homeRouter);
app.use('/accounts', accountRouter);
app.use('/stocks', stocksRouter);
app.use('/party', partyRouter);
app.use('/aboutus', aboutusRouter);
app.use('/help', helpRouter);

module.exports = app;
