const Emitter = require("events");

class Register extends Emitter{
     register = (username) =>{
        console.log("Registration is in process");
        this.emit("registered",username); // creating a email verification event
    }
    
}

const user1 = new Register();

// Listen events

user1.on("registered",(data)=>{
    console.log(`OTP has been sended to ${data}`);
})

user1.on("registered",(data)=>{
    console.log(`Verification of ${data} email done!`);
})

user1.on("registered",(data)=>{
    console.log(`${data} has been successfully registered!`);
})
user1.register("Kunal");