const mongoose = require("mongoose");
const {Schema} = mongoose;

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

  const personSchema= new Schema({
    username:String,
    email:String

  })


  const postSchema = new Schema({
    content:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:"Person"
    }
  })

  const Post = mongoose.model("Post",postSchema);
  const Person = mongoose.model("Person",personSchema);

  const initModel = async()=>{
    let person = await Person.findOne({username:"Rahul"}); 
    


    let post2 = new Post({
        content:"This is my second post on instagram",
    })
    post2.user = person;

    await post2.save();
  }

  // initModel();

  const showPost = async()=>{
   let result= await Post.find().populate("user");
   console.log(result);
  }
  showPost()