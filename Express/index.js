const express = require('express')
const app = express()

const port = 3000;
app.listen(port,()=>{
  console.log(`Request received on port ${port}`);
});

// //app.use is used to specify middleware functions that should be executed for every incoming HTTP request, regardless of the HTTP method (GET, POST, PUT, DELETE, etc.) or the specific route.
// // app.use((req,res)=>{
// //   console.log("Response recived");
// //   const code = "<h1>Fruits</h1><ul><li>Apple</li><li>Banana</li></ul>";
// //   res.send("hello");
// // })

// //app.get is a method used to define a route handler specifically for HTTP GET requests. It is used to handle GET requests made to a specific route.
// app.get('/',(req,res)=>{
//   res.send("You make a request for root");
// });

// app.get('/search',(req,res)=>{
//   res.send("You request to search"); 
// });

// app.get('/help',(req,res)=>{
//   res.send("You request to help");
// });

// //If we make a request to a route which doesn't exist's (ex: In this case localhost/contact) we will not get a response
// //So we can handle this case by:
// app.get("*",(req,res)=>{
//   res.send("Route doesn't exist");
// })


// //Sending a POST request
// app.post('/',(req,res)=>{
//   console.log("You send a post request");
// });

// //Path parameters

app.get('/:username/:id',(req,res)=>{
    const p = req.params;   //p will be an object in which the path parameters will store
    const {username,id} = p;
    res.send(`Hi ${username} your id is ${id}`);
});  //So we need to access like localhost:3000/kunal/123

//Query string
app.get('/s',(req,res)=>{
  const queryString = req.query;    //The query string is an object in which whatever we will write in search?q=${}  that will be store in form of object.So we need to access like localhost:3000/search?=apple&color=red

  //Result: {
  //   "q":"apple",
  //   "color":"red"
  // }
  const html = `<h1>Search request for ${queryString}</h1>`;
  res.send(queryString);
})