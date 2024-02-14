const express = require("express");
const app = express();

// app.use("/api",(req,res,next)=>{
//     let {token} = req.query;
//     if(token === "giveaccess"){
//        return next();
//     }
//     res.send("ACCESS DENIED!");
// });
// app.get("/api",(req,res)=>{
//     res.send("data");
// })

//OR 

const checkAccess = ("/api",(req,res,next)=>{
    let {token} = req.query;
    if(token==="giveaccess"){
        return next();
    }
    res.send("ACCESS DENIED");
})

app.get("/api",checkAccess,(req,res)=>{
    res.send("Data");
})
app.listen(8080,(req,res)=>{console.log("Listening");});