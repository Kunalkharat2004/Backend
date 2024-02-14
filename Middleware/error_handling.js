const express = require("express");
const ExpressError = require("./ExpressError");
const app = express();

const checkToken = ((req,res,next)=>{
    let {token} = req.query;
    if(token === "giveaccess"){
        return next();
    }
    throw new ExpressError(401,"ACCESS DENIED!");
});

app.get("/api",checkToken,(req,res)=>{
    res.send("Data");
})
app.get("/err",(req,res)=>{
    abcd = abcd;
})
app.use((err,req,res,next)=>{
    let { status=500,msg="Some error occured"} = err; // If status code is undefined then set it to 500 & msg to "Some error occured"
    res.status(status).send(msg);
})

app.listen(8080,(req,res)=>{
    console.log("Listening");
});
