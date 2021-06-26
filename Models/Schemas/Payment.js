const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const sender = require('./User')

const paymentSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    paymentID:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    cart:{
        type: Array,
        default: []
    },
    status:{
        type: Boolean,
        default: false
    },
    sender: {
        type:Schema.Types.ObjectId,
        ref:'user'
    }
}, {
    timestamps: true
})

module.exports= paymentSchema