const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type: String,
        required:true
    },
    msg:{
        type:String,
        maxLength : 50,
        required:true
    },
    created_at:{
        type:Date,
        
    },
    updated_at:{
        type:Date,
    }

})

module.exports = chatSchema;