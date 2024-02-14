const express = require("express");
const app = express();
const User = require("./models/user.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { default: mongoose } = require("mongoose");
const MONGO_URI = "mongodb://127.0.0.1:27017/authenticate";
const userRouter = require("./routes/user.js");
const path = require("path");

//Making connection with mongodb 
async function main() {
    await mongoose.connect(MONGO_URI);
  }
  main()
    .then((res) => {
      console.log("Sucessfully connected to Database");
    })
    .catch((err) => {
      console.log(err);
    });
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

    const sessionOptions = {
        secret:"mysecretsuperkey",
        resave:false,
        saveUninitialized:true,
        cookie:{
            expires: Date.now() + 7*24*60*60*1000,
            maxAge: 7*24*60*60*1000
          }
    }

    app.use(session(sessionOptions));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

  



    app.use("/user",userRouter);
  

app.listen("3000",()=>{
    console.log("Listening on port 3000");
})