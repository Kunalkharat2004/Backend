const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalStrategy = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
})
userSchema.plugin(passportLocalStrategy);

const User = new mongoose.model("User",userSchema);

module.exports = User;