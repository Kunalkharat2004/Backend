const express = require("express");
const app = express();

const port= 3000;
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
});

app.set("view engine","ejs");
//Instead of res.send() we use res.render() 
app.get('/',(req,res)=>{
    res.render("home.ejs");
});
app.get('/help',(req,res)=>{
    res.send("Hello");
})
//When we start the server from a random directory where the views folder is not present (ex: C:\Users\kunal sachin kharat\OneDrive\Desktop\Web development\Backend>nodemon EJS/index.js)

//When we search localhost:3000/help ==> "Hello";
//But when we search localhost:3000 it will give an error :- Failed to lookup view "home.ejs" in views directory "C:\Users\kunal sachin kharat\OneDrive\Desktop\Web development\Backend\views"
//i.e the express is trying to search the views folder in the Backend directory
//To fix this issue include this in your index.js file:

const path = require('path');
app.set("views",path.join(__dirname,"/views"));


//Interpolation
//In EJS (Embedded JavaScript), interpolation is a way to embed dynamic JavaScript code within your HTML templates.

//It allows you to insert values, variables, or JavaScript expressions into your HTML output. The syntax for interpolation in EJS uses the <%= ... %> tags. 

app.get("/hello",(req,res)=>{
    res.render("hello.ejs");
})

app.get("/randomNo",(req,res)=>{
    const randomNo= Math.floor(Math.random()*6)+1;  //In actual case the data will came from the database and that we can display in the ejs file.
    // res.render("random_no.ejs",{num:randomNo}); 
    //OR
    // res.render("random_no.ejs",{randomNo:randomNo}); //If we want the key name same as the value name then we use the below syntax : And in most of the cases we make use of this syntax only
    res.render("random_no", {randomNo});       
});