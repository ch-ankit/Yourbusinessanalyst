const router = require('express').Router();
const path = require('path')



router.get('/home',(req,res)=>{
        res.sendFile('home.html',{root:path.join(__dirname,'../views')})
    });
// router.get('/help',(req,res)=>{
//         res.sendFile('help.html',{root:path.join(__dirname,'../views')});
//     });
// router.get('/sboutsus',(req,res)=>{
//         res.sendFile('aboutus.html',{root:path.join(__dirname,'../views')});
//     });
// router.get('/stock',(req,res)=>{
//         res.sendFile('stock.html',{root:path.join(__dirname,'../views')});
//     });

module.exports = router