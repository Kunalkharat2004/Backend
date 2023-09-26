const PI = Math.PI;
const square= num1 => num1**2;
const table =(num)=>{
    for(let i=1;i<=10;i++){
        console.log(num*i);
    }
}
const mul=(num1,num2)=> num1*num2;

// const obj = {
//     PI:PI,
//     square:square,
//     table:table,
//     mul:mul
// };
// module.exports = obj;

//OR
module.exports= {
    PI:PI,
    square:square,
    table:table,
    mul:mul
};