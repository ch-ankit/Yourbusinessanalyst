const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');
///////////////////////////
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connection successful'));
///////////////////////////
PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server  started at port ${PORT}`);
});
