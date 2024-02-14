const express= require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const chatSchema = require('./models/chat.js');
const methodOverride = require("method-override");
const ExpressError = require('./ExpressError.js');

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/chat");
}
main()
.then((res)=>{
    console.log("Successfully connected to database!");
})
.catch((err)=>{
    console.log(err);
})

app.listen(8080,()=>{
    console.log(`Listening at port 8080`);
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const Chat = mongoose.model('Chat',chatSchema);

const asyncWrap = (fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{next(err)});
    }
}

app.get('/',(req,res)=>{
    res.send("Working :)");
})

app.get("/chats",asyncWrap(async (req,res)=>{

    let chats = await Chat.find();
    res.render("index.ejs",{chats});
}));

app.get("/chats/new",(req,res)=>{
    // throw new ExpressError(500,"Page not found !");
    res.render("new.ejs");
})


app.post("/chats",asyncWrap(async(req,res,next)=>{

        let {username,recptusername,msg} = req.body;
        let newChat = new Chat({
            from:username,
            to:recptusername,
            msg:msg,
            created_at: new Date()
        });
       await newChat
        .save()
    
        res.redirect("/chats");
}))

// Edit route

app.get("/chats/:id/edit",asyncWrap(async(req,res,next)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
       next(new ExpressError(404,"Invalid user ID !"));
    }
    // console.log(chat);
    res.render("edit.ejs",{chat});
}))

// Update route

app.put("/chats/:id",asyncWrap(async(req,res)=>{
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    let updated_at = new Date();
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg,created_at:updated_at},{runValidators:true,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
}));

// Delete route

app.delete("/chats/:id",asyncWrap(async(req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
}))

//Error handling middleware
app.use((err,req,res,next)=>{
    let {status=500,message="Error occurred"} = err;
    res.status(status).send(message);
})