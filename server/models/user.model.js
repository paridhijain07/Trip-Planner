import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'provide name']
    },
    email:{
        type:String,
        required:[true,'provide email']   
    },
    password:{
        type:String,
        required:[true,'provide password']
    },
    mobile:{
        type:Number,
        default:null,
    },
    last_login_date:{
        type:String,
        default:''
    },
    refresh_token:{
        type:String,
        default:''
    },
    access_token:{
        type:String,
        default:'',
    },
})
module.exports=userSchema