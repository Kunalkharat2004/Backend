const mongoose = require("mongoose");
const chatSchema = require('./chat.js');

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/chat");
}
main()
.then((res)=>{
    console.log("Connection Sucessfull!");
})
.catch((err)=>{
    console.log(err);
})
const Chat = mongoose.model('Chat',chatSchema);

const chats = [
    {
        from:"Kunal",
        to:"Priya",
        msg:"Hello how are you ?",
        created_at: new Date()
    },
    {
        from:"Riya",
        to:"Mohit",
        msg:"Can we go to movie",
        created_at: new Date()
    },
    {
        from:"David",
        to:"Alice",
        msg:"Hey bro, let's party tonight",
        created_at: new Date()
    },
    {
        from:"Harry",
        to:"Potter",
        msg:"Did you watch Spiderman",
        created_at: new Date()
    },
    {
        from:"Gems",
        to:"Cassy",
        msg:"Have you completed your work ?",
        created_at: new Date()
    },
    {
        from:"Franklin",
        to:"Michael",
        msg:"Hey man,GTA VI is comming",
        created_at: new Date()
    }
]
Chat.insertMany(chats)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})