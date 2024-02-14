const { faker, tr, da } = require('@faker-js/faker');
const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 8080;
const path = require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const { emit } = require('process');

const connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"app"
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"/public/css")));

app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));

let getRandomUser =()=>{
  return [ 
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password()
    ];
}

// <----------INSERTING DATA WAY -01--------------->

// let q = "INSERT INTO user(id,username,email,password) VALUES (?,?,?,?)";
// let user = [1,"Kunal","kunal@gmail.com","dwefrfrew7f"];

// <----------INSERTING DATA WAY -02--------------->

// let q1 = "INSERT INTO user(id,username,email,password) VALUES ?";
// let users = [[2,"Janvi","Janvi@gmail.com","dewdwcdst43"],
//              [3,"Harsh","harsh@gmail.com","23432ds5ws"],
//              [4,"Manish","manish@gmail.com","ewfdewaf45#4few"]];


// <----------INSERTING DATA USING FAKER WAY -03--------------->

// let q3 = "INSERT INTO users(id,username,email,password) VALUES ?";
// let data = [];
// for(let i = 1 ;i<=100;i++){
//   data.push(getRandomUser());
// }
// try{
//   connection.query(q3,[data],(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//   })
// }catch(err){
//   res.send(err);
// }
app.listen(port,()=>{
  console.log("Server is listening at port 8080");
})
app.get('/',(req,res)=>{
  let q = "SELECT COUNT(*) FROM users";
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let count = result[0]["COUNT(*)"];
      res.render("home.ejs",{count});
    })
  }catch(err){
    res.send("Error in database");
  }
});

// <-------------SHOW ROUTE------------->

app.get('/user',(req,res)=>{
  let q = "SELECT * FROM users";
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      // console.log(result);
      res.render("show.ejs",{result});
    })
  }catch(err){
    console.log("Error in Database");
  }
})
// <-------------EDIT ROUTE------------->

app.get('/user/:id/edit',(req,res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM users WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
     let user = result[0];
     res.render("edit.ejs",{ user });
    })
  }catch(err){
    console.log("Something went wrong in Database");
  }
})

// <-------------UPDATE ROUTE------------->

app.patch('/user/:id',(req,res)=>{
  let {id} = req.params;
  let {password:UserPassword,username:NewUserName} = req.body;
  let q = `SELECT * FROM users WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      let user = result[0];
      if(UserPassword != user.password){
        res.send("Wrong Password");
      }else{
       try{
        let q2 = `UPDATE users SET username='${NewUserName}' WHERE id='${id}'`;
        connection.query(q2,(err,result)=>{
          res.redirect('/user');
        })
       }catch(err){
        console.log("Error occurred");
       }
      }
    })
  }catch(err){
    console.log("Error occured!");
  }
});

// <-------------DELETE ROUTE------------->
app.delete('/user/:id/delete',(req,res)=>{
  let {id} = req.params;
  let q4 = `SELECT * FROM users WHERE id='${id}'`;
  try{
    connection.query(q4,(err,result)=>{
      let user = result[0];
      let q5 = `DELETE FROM users WHERE id='${user.id}'`;
      try{
        connection.query(q5,(err,result)=>{
          if(err) throw err;
          res.redirect("/user");
        })
      }catch(err){
        res.send(err);
      }
    })
  }catch(err){
    res.send(err);
  }
})

// <-------------ADD NEW USER ROUTE------------->
app.get('/user/new',(req,res)=>{
  res.render("new.ejs");
});

app.post('/user',(req,res)=>{
  let{username,email,password,confirm_password} = req.body;
  if(confirm_password != password){
    res.send("Password doesn't match with your previous password");
  }
  let id = uuidv4();
  let q6 = "INSERT INTO users(id,username,email,password) VALUES (?,?,?,?)";
  let data = [id,username,email,password];
  try{
    connection.query(q6,data,(err,result)=>{
      if(err) throw err;
      res.redirect('/user');
    })
  }catch(err){
    console.log(err);
    res.send(err);
  }
});