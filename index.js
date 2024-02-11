const express=require("express")
const cors=require("cors")
const app=express()
const mongoose=require("mongoose")
const User=require("./models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

app.use(cors())
app.use(express.json())

app.post("/register",async (req,res)=>{
    try{
        const {name,email,password}=req.body
        const hashedpassword=await bcrypt.hash(password, 10)
        console.log(hashedpassword)
        const userd_data=await User.create({name,email,password:hashedpassword})
        res.json({data:userd_data})
    }
    catch(err){
        console.log(err)
        res.json({status:"error",error:"duplicate key"})
    }
   
})


app.post("/login",async (req,res)=>{
    // console.log("hello")
        const {email,password}=req.body 
        const userFound=await User.findOne({email})
        if(!userFound){
            return res.json({status:"error", error: "Invalid login"})
        }

        const is_password_valid=await bcrypt.compare(password,userFound.password)
        
        if(is_password_valid){
            const token=jwt.sign({
                email:userFound.email
            }, "this is secret")
            console.log("inside valid")
            return res.json({status:"ok",userFound:token})
        }   
        else{
            return res.json({status:"error",error:"password invalid"})
        }
   
})

mongoose.connect("mongodb+srv://Sukumar:Apple123@cluster0.r3hvx9l.mongodb.net/registration_project?retryWrites=true")
.then(()=>console.log("mongodb is connected"))
.catch((err)=>console.log(err))

app.listen(3001,()=>{
    console.log("app is running on port 3001")
})