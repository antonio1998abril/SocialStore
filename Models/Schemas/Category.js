const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CategorySchema = new Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});

module.exports= CategorySchema