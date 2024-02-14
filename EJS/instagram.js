const express = require('express');
const app = express();
const port = 8080;
app.listen(port,()=>{
    console.log(`Port is listening at port ${port}`);
});
app.set("view engine","ejs");

const path = require('path');
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,'/public/css')));
app.use(express.static(path.join(__dirname,'/public/js')));

const instaData = require('./data.json');
app.get("/:username",(req,res)=>{
 let { username } = req.params;
    const data = instaData[username];
   if(data){
   res.render("instagram",{data});
  }
else{
    res.render("error");
}
})