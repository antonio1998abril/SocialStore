const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PortSchema = new Schema({
    portName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    ubication:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});

module.exports= PortSchema