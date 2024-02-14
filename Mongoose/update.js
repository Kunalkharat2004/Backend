const mongoose = require("mongoose");

async function connection(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
connection()
.then((res)=>{console.log("Connection Successful!");})
.catch((err)=>{console.log(err);})

const studentSchema = new mongoose.Schema({
    std_name:{type:String,
          require:true
        },
    std_roll_no:{
        type:Number,
        require:true
    },
    std_marks:{
        type: Array,
    }    
           
})
const Student = mongoose.model('Student',studentSchema);

// Student.insertMany([
//     {std_name:"Janvi",std_roll_no :21,std_marks:[34,45,21,67]},
//     {std_name:"Chetna",std_roll_no :21,std_marks:[45,56,23,52]},
//     {std_name:"Rahul",std_roll_no :21,std_marks:[56,95,71,67]},
//     {std_name:"Sayali",std_roll_no :21,std_marks:[64,78,32,48]}
// ])
// .then((res)=>{console.log(res);})
// .catch((err)=>{console.log(err);})

Student.updateOne({std_name:'Janvi'},{std_name:"Prashant"})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

Student.find()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

// Student.deleteMany({id:{$exists:true}})
// .then((res)=>{console.log("Deletion successfull");})
// .catch((err)=>{console.log(err);})