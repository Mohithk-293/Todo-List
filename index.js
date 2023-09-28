import express from "express";
import bodyParser from "body-parser";

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
let day = days[d.getDay()];
let month = months[d.getMonth()];
let date=d.getDate();

var arr=["Buy Food","Take her to date","Task at 8 am"];
var work_arr=["Seminar at 10am","Project submission","Report preparation"];
app.get('/',function(req,res){
    res.render("index.ejs",{items:arr,current_day:day,current_month:month,current_date:date});
});
app.get('/work',function(req,res){
res.render("work.ejs",{items:work_arr});
});

app.post('/',function(req,res){
    
   let newItem=req.body.item;
   arr.push(newItem);
    res.render("index.ejs",{items:arr,current_day:day,current_month:month,current_date:date});
   
   
});

app.listen(3000,function(){
    console.log("server is running in port 3000");
});