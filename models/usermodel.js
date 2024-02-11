const mongoose=require("mongoose")


const User= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})


const UserModel=mongoose.model("user_Data",User)
module.exports=UserModel