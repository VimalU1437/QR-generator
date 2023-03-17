const express = require("express");
const app = express();
const qr = require("qrcode");
const path = require("path");



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.set("views",path.join(__dirname,"view"));
app.set("view engine","ejs");



app.get("/",async(req,res)=>{
    try{
        res.render("initial.ejs");
    }
    catch(e){
        res.sendStatus(500);

    }
})

app.post("/",async(req,res)=>{
    try{
        let text = req.body.text;
        qr.toString(text,{type:"svg"},(err,qr)=>{
            if(err){
                console.log(err);
                res.sendStatus(500);
            }else{
                // console.log(qr);
                res.render("generated.ejs",{qr:qr,text:text})
            }
        })

    }
    catch(e){
        res.sendStatus(500);

    }
})


module.exports = app;