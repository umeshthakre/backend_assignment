const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
        max:1000;
    },
    description:{
        required:true,
        max:10000,
    },
    likes:{
        type:Number,
    }
    created_at:Date.now(),
    
   
});
