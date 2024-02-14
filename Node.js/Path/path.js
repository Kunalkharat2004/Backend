const path = require("path");

console.log(path.dirname(__filename)); // gives the directory's absolute path where the file is present

console.log(path.basename(__filename)); // gives the file name

console.log(path.extname(__filename)); // gives the extension name of current file

console.log(path.parse(__filename));  // gives an object with all above info

console.log(path.join(__dirname,"test","app.js")); // use for joining the file

