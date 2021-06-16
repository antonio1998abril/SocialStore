const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const FollowSchema = new Schema({
    follow:{
        type:String,
        default:false
    }, 
    userfollowing:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    userfollower:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }

},{timestamps:true});

module.exports= FollowSchema