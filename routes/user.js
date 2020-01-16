const router = require('express').Router();
const path = require('path')


//For Login
router
    .get('/login',(req,res)=>{
        res.sendFile('login.html',{root:path.join(__dirname,'../views')});
    })

    .post('/login',(req,res)=>{
        username = req.body.username;
        password = req.body.password;
        if(username == 'admin' && password == 'admin'){
            //res.redirect('/');
            res.send("login data valid")
        }else{
    
            res.send("Password Incorrect Try again!!");
        }
    });




module.exports = router
