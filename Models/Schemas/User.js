const mongoose =require('mongoose')
const Schema = mongoose.Schema;
const CompanySchema = require('./Company')

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    ocupation:{
        type:String,
        required: false
    },
    password:{
        type:String,
        required: true
    },
    service:{
        type:String,
        required: true
    },
    tel:{
        type:String,
        min:1,
        max:10
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    company:{
        type:String,
        required:false
    },
    follows:[{
        type:Schema.Types.ObjectId,
        ref:'follow'
    }]
})

module.exports = UserSchema