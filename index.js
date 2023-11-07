import express from "express";
import bodyParser from "body-parser";
import pg  from "pg";

const app=express();

const db=new pg.Client({
   user:"postgres",
   host:"localhost",
   database:"Todo_list",
   password:"M200429h",
   port:5432,

});

db.connect();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
let day = days[d.getDay()];
let month = months[d.getMonth()];
let date=d.getDate();


/*items-list*/

async function itemsListed(){
    const items= await db.query("select * from items order by id asc");
    return items.rows;
}

app.get('/',async(req,res)=>{
    
    const items=await itemsListed();
    res.render("index.ejs",
    {
    items:items,
    current_day:day,
    current_month:month,
    current_date:date
});
});

app.post('/add',async(req,res)=>{
    
    let newItem=req.body.item;
    if(newItem!=""){
    await db.query("insert into items (title) values($1)",[newItem]);
    }
    res.redirect('/');
    
    
 });
/*items-list*/


/*works-list*/

async function workListed(){
    const works= await db.query("select * from work_list order by id asc");
    return works.rows;
}

app.get('/work',async(req,res)=>{

    const works=await workListed();
res.render("work.ejs",
{
    items:works
});
});

app.post('/addWork',async(req,res)=>{

    let newWork=req.body.work;
    
    if(newWork!=""){
        await db.query("insert into work_list (works) values($1)",[newWork]);
        }
    res.redirect('/work');
});
/*works-list*/


//delete
app.post('/deleteItemRoute',async(req,res)=>{
    let deleteItem=req.body.deleteItem;
    await db.query("delete from items where id=$1 ",[deleteItem]);
    res.redirect('/');
});

app.post('/deleteWorkRoute',async(req,res)=>{
    let deleteItem=req.body.deleteItem;
    await db.query("delete from work_list where id=$1 ",[deleteItem]);
    res.redirect('/work');
});
//delete

//edit
app.post('/editItem',async(req,res)=>{
    const upItemId=req.body.updatedItemId;
    const upItemTitle=req.body.updatedItemTitle;
    await db.query("update items set title=$1 where id=$2",[upItemTitle,upItemId]);
    res.redirect('/');
});

app.post('/editWork',async(req,res)=>{
    const upWorkId=req.body.updatedWorkId;
    const upWorkTitle=req.body.updatedWorkTitle;
    await db.query("update work_list set works=$1 where id=$2",[upWorkTitle,upWorkId]);
    res.redirect('/work');
});
//edit

app.listen(3000,function(){
    console.log("server is running in port 3000");
});