const express = require('express');
const app = express();
const methodOverride = require('method-override');
const { v4 : uuidv4 } = require('uuid');
const port = 8080;
app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
});

app.use(methodOverride('_method'));

app.set("view engine","ejs");
const path = require('path');
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,'/public/css')));
app.use(express.static(path.join(__dirname,'/public/js')));

let posts = [
    {
        id:uuidv4(),
        username:"ZaraKhan1995",
        description:"Hello my name is Zara Khan",
        image:"https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        age:27
    },
    {   
        id:uuidv4(),
        username:"LacyJuber2000",
        description:"Hello my name is Lacy",
        image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        age:25
    },
    {     id:uuidv4(),
        username:"AasthaJain1997",
        description:"Hello my name is Aastha",
        image:"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1727&q=80",
        age:29
    }
];

app.use(express.urlencoded({extended:true}));

app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts});
});
// <------------------------CREATE POST------------------------>

app.get('/posts/new',(req,res)=>{
    res.render("new.ejs");
});
app.post('/posts',(req,res)=>{
    const {username,description,image,age} = req.body;
    const id = uuidv4();
    posts.push({id,username,description,image,age});
    res.redirect("/posts");
});

// <------------------------SEE DETAIL------------------------>

app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    const postInDetail = posts.find((p)=>{
       return p.id === id;
    });
    if(postInDetail){
        // console.log(postInDetail);
    res.render("show.ejs",{postInDetail});
    }else{
        res.render("error.ejs");
    }
});


// <------------------------UPDATE------------------------>
app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let currentPost = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{currentPost});
})
app.patch('/posts/:id',(req,res)=>{
    let {id} = req.params;
    const postInDetail = posts.find((p)=>{
        return p.id===id;
    });
    let newUsername = req.body.username;
    let newDescription = req.body.description;
    let newImage = req.body.image;
    let newAge = req.body.age;
    postInDetail.username = newUsername;
    postInDetail.description = newDescription;
    postInDetail.image = newImage;
    postInDetail.age = newAge;

    console.log(postInDetail);
    res.redirect('/posts');
});

// <------------------------DELETE------------------------>

app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params;
     posts = posts.filter((p)=>{
        return id !== p.id;
    });
    res.redirect('/posts');
});