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


// findOneAndUpdate

User.findOneAndUpdate({name:"Sachin"},{age:45},{new : true})
.then(res=>{console.log(res);})
.catch(err=>{console.log(err);})