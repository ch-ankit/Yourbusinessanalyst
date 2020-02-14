const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');
const accountRouter = require('./routes/account');
const stocksRouter = require('./routes/stocks');
const partyRouter = require('./routes/party');
const aboutusRouter = require('./routes/aboutus');
const helpRouter = require('./routes/help');
const clientsRouter = require('./routes/clients');
const suppliersRouter = require('./routes/suppliers');
const historyRouter = require('./routes/history');
const stocksHistoryRouter = require('./routes/stocksHistory');
const paymentHistoryRouter = require('./routes/paymentHistory');
const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    add1: value => value + 1,
    multiply: (a, b) => a * b,
    sub: (a, b) => a - b,
    profit: (a, b, c) => (a - b) * c
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('cookie-parser')());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/user', userRouter);
app.use('/home', homeRouter);
app.use('/accounts', accountRouter);
app.use('/stocks', stocksRouter);
app.use('/party', partyRouter);
app.use('/aboutus', aboutusRouter);
app.use('/help', helpRouter);
app.use('/clients', clientsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/transhistory', historyRouter);
app.use('/paymenthistory', paymentHistoryRouter);
app.use('/stockshistory', stocksHistoryRouter);
console.log(
  `${new Date().getFullYear() + new Date().getMonth() + new Date().getDate()} `
);
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.render('error', {
    title: '💥💥💥ERROR💥💥💥',
    message: `:: ${err.message}`,
    error: err,
    status: err.status || 500
  });
});

module.exports = app;
