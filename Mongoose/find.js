const mongoose = require('mongoose');

//Establish connection

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
main()
.then(()=>{
    console.log("Connection Successfull!");
})
.catch((err)=>{
    console.log(err);
})

// Create Schema

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age:Number
});

// Create a model
const User = mongoose.model('User',userSchema);


//find

User.find({name:"Kunal"})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

// // findOne 

User.findOne({name:""})
.then((res)=>{console.log(res);})
.catch((err)=>{console.log(err);})

// // findById:

User.findById("6569b22ee3acb1f6ee05ad1e")
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

// User.updateOne({name:"Kunal"},{email:"Hacker@123.com"})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

