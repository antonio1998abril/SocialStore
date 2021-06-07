const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ProductSchema = require('./Product')

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
    product : ProductSchema 
})

module.exports= CompanySchema