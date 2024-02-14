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

  //Order model Schema
   const orderSchema = new mongoose.Schema({
    item:String,
    price:Number
   });  
   
     //Customer model Schema
     const customerSchema = new mongoose.Schema({
        name:String,
        orders:[{
            type:Schema.Types.ObjectId,
            ref:"Order"
        }
        ]
     })

// Delete middleware:  When we delete a particular customer then it's corresponding orders should also get deleted
customerSchema.post("findOneAndDelete",async(customer)=>{
  let deleteResult = await Order.deleteMany({"_id":{$in:customer.orders}});
  console.log(deleteResult);
})

     const Order = mongoose.model("Order",orderSchema);
     const Customer = mongoose.model("Customer",customerSchema);
//Customer Model
const customer = async()=>{
  
    const customer1 = new Customer({
        name:"Rahul",
    }); 
    let order1 = await Order.findOne({item:"Mithai"});
    let order2 = await Order.findOne({item:"Pani puri"});
    let order3 = await Order.findOne({item:"Kachori"});
    customer1.orders.push(order1)
    customer1.orders.push(order2)
    customer1.orders.push(order3)
    await customer1.save(); 
}
// customer();


const findCustomer = async()=>{
    let PopulateResult=await Customer.find().populate("orders"); // populate() lets you reference documents in other collections.
    let normalResult = await Customer.find({});

    console.log(normalResult);
    console.log(PopulateResult[0]);
}
// findCustomer();


   //Order Model
   const order = async()=>{

    await Order.insertMany([
        {item:"Samosa",price:15},
        {item:"Dahi vada",price:40},
        {item:"Mithai",price:220},
        {item:"Pani puri",price:20},
])
   }
// order();

//On delete cascade
const deleteCustomer = async()=>{
  let result = await Customer.findByIdAndDelete("657da33bdb5b7aeb0dcd3339");
  console.log(result);
}
// deleteCustomer();