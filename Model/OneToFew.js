const mongoose = require("mongoose");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/demo");
}
main()
.then((res) => {
    console.log("Sucessfully connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

  const userSchema = new mongoose.Schema({
    username:String,
    address:[
        {
            location:String,
            city:String
        },
    ]
  })

  const User = mongoose.model("User",userSchema);

  let initUser = async()=>{
    await User.deleteMany({});
    let user1 =  new User({
        username:"Kunal",
        address:[{
            location:"Mahadevnagar vrundawan heights flat no 203",
            city:"Pune"
        }
    ,{
        location:"VIT pune bibewadi",
        city:"Pune"
    }
]
    })
    user1.save()
  }
  initUser();