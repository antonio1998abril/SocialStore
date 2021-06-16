const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
/*         trim:true, */
/*         unique:true */
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
        required:false
    },
    category:{
        type:String,
        required:false
    },
    port:{
        type:String,
        required:false
    },
    checked:{
        type:Boolean,
        default:false
    },
    byuser: {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    bycompany:{
        type:String,
        required:false
    },
    sold:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports = productSchema
