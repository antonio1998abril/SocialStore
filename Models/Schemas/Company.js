const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const CompanySchema = new Schema({
    companyName:{
        type:String,
        required: false
    },
    ubication:{
        type:String,
        required: false
    },
    companyService:{
        type:String,
        required: false
    },
    openService:{
        type:Boolean,
        default:true,
        required: false
    },
    companyEmail:{
        type:String,
        required:true
    },
    port:{
        type:String,
        required:false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})

module.exports= CompanySchema