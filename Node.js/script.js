// let n = 2;
// for(let i=1;i<11;i++){
//     console.log(n*i);
// }
// console.log("Hello Kunal");

let args = process.argv;
console.log(args);
for(let i=2;i<args.length;i++){
    console.log("Hello",args[i]);
}

