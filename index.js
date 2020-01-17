const express = require('express');
const path = require('path');

const userRouter=require('./routes/user');
const homeRouter=require('./routes/home');



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'/public')));

app.use('/',userRouter);

PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server  started at port ${PORT}`);
});