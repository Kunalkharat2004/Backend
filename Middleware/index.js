const express = require("express");
const app = express();

app.use((req,res,next)=>{
    // console.log("Hi I am 1st middleware");
    req.time = new Date(Date.now()).toLocaleTimeString();
    console.log(req.method,req.path,req.hostname,req.time);
    next();
});
app.use((req,res,next)=>{
    // console.log("Hi I am 2nd middleware");
    return next();
})
app.use("/random",(req,res,next)=>{
    console.log("I am random");
    next();
})


app.get("/",(req,res)=>{
    res.send("This is home route");
    
});
app.get("/random",(req,res)=>{
    res.send("This is random route");
});



app.listen(8080,(req,res)=>{console.log("Listening");});
