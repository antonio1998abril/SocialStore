const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },images:{
        type:Object,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    checked:{
        type:Boolean,
        default:false
    },
    sold:{
        type:Number,
        default:0
    }

},{timestamps:true})

module.exports = productSchema