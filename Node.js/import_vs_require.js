//Require
//require is the traditional way to include modules in Node.js, and it's used with CommonJS modules.
//It's synchronous, meaning that the code won't proceed until the required module is loaded and executed.
// var figlet = require("figlet");

// figlet("Kunal", (err, data)=> {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });

//Import
//import is the new method introduce in ES6 to import to require stuff from other files
//ES modules(import) are asynchronous, and they are recommended for modern JavaScript development because they provide better support for static analysis and tree shaking.

//To use ES modules (the import syntax), you need to have the .mjs extension for your JavaScript files, or you can set "type": "module" in your package.json file to enable ES module support throughout your project.

import {PI,square,table} from "./import_vs_require02.js";
console.log(PI);
console.log(table(3));


//Random word generate package
import { generate} from "random-words";

console.log(generate());
//output: 'army'