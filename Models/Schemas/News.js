const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const NewsSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    },
    port:{
        type:String,
        required:true
    }, 
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }

},{timestamps:true});

module.exports= NewsSchema