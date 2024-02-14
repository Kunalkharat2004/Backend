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

// insertOne

const user1 = new User({
    name:"Sachin",
    email:"sachin@gmail,com",
    age:32
});

user1.
save()
.then((res)=>{console.log("Inserted successfully!");})
.catch((err)=>{console.log(err);})

// insertMany

User.insertMany([
    {name:"Shraddha",email:"shraddha@yahoo.in",age:29},
    {name:"David",email:"david@yahoo.in",age:22},
    {name:"Cassy",email:"cassy@yahoo.in",age:21},
]).then((res)=>{
    console.log(res);
})