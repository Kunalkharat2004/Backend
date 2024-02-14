const express = require("express");
const app = express();
const port = 8080;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
});
app.get('/register',(req,res)=>{
    let q = req.query;
    let {name:username,password} = q;
    res.send(`Hi ${username} your password is ${password}`);
})
//In case of POST request the data is stored in the request body which we have to parse so that Express will understand it.
//As in GET request we can access the urlencoded data through query strings

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post("/register",(req,res)=>{
   let {name:username,password} = req.body;
   res.send(`Hi ${username} your password is ${password}`);
});