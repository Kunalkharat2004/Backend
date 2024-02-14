const path = require("path");
const fs = require("fs");

// Creating a new folder

// fs.mkdir(path.join(__dirname,"test"),(err)=>{
//     if(err){
//         console.log("Something went wrong!");
//         return;
//     }
//     console.log("Folder created..");

// })

// // Creating & Writing in a file

// fs.writeFile(path.join(__dirname,"test","test.txt"),"Hello node\n",(err)=>{
//     if(err) throw new Error;
//     else {
//         console.log("File created");
//         fs.appendFile(path.join(__dirname,"test","test.txt"),"More data",(err)=>{
//             if(err) throw new Error;
//             else console.log("Data added");
//         })
// }})

// Reading a file 
fs.readFile(path.join(__dirname,"test","test.txt"),'utf-8',(err,data)=>{
    if(err) throw err;
    else{
        console.log(data);
    }
})