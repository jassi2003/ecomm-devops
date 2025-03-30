const userModel = require("../models/user.models"); // Updated path
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

// register user
module.exports.userRegisterController=async(req,res)=>{
    try{
        
const {name,email,password}=req.body;
 const user= await userModel.findOne({email})

 if(user){
    throw new Error("user already exists,please login...")
 }

console.log("req.body",req.body)

if(!name){
    throw new Error("name is required")
}
if(!email){
    throw new Error("email is required")
}
if(!password){
    throw new Error("password is required")
}

const salt=bcrypt.genSaltSync(10);
const hashPassword= await bcrypt.hashSync(password, salt);
if(!hashPassword){
    throw new Error("something went wrong")
}

const payload={
    ...req.body,
    role:"GENERAL",
    password:hashPassword
}

const userData= new userModel(payload)
const saveUser=await userData.save()
res.status(201).json({
    data:saveUser,
    suceess:true,
    error:false,
    message:"user created successfully!!!"
})


    }
    catch(error){
        res.json({
            message:error.message || error,
            error:true,
            success:false,
        })
    }
}

//login user
module.exports.userLoginController=async(req,res)=>{
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Email is required");
        }

        if (!password) {
            throw new Error("Password is required");
        }

    const findUser= await userModel.findOne({email})
    if(!findUser){
        throw new Error("email was incorrect");
 }

 const checkPassword= await bcrypt.compare(password,findUser.password)
console.log("checkdpass",checkPassword)
       
if(checkPassword){
const tokenData={
    _id:findUser._id,
    email:findUser.email,
}
const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn:60*60*8});

// const tokenOption={
//     httpOnly:true,
//     secure:true
// }
// res.cookie("token",token,tokenOption).status(200).json({
res.cookie("token",token).status(200).json({
    message:"Successfully logged In...",
    data:token,
    success:true,
    error:false
})
}else{
    throw new Error(" password was incorrect");
}

}  catch(error){
        res.json({
            message:error.message || error,
            error:true,
            success:false,
        })
    }
}

//updateuser
module.exports.updateUser=async(req, res) =>{
    try {
const sessionUser=req.userId;

        const { userId, email, name, role } = req.body

        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role }),
        }
        const user=await userModel.findById(sessionUser)
        console.log("userRole",user.role)

        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data: updateUser,
            message: "user updated successfully",
            success: true,
            error: false
        })
    }

        catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

//logoutUser
module.exports.userLogoutController=async(req,res)=>{
    try{
res.clearCookie("token")

res.json({
    message:"logged out successfully",
    error:false,
    success:true,
    data:[]
})
    }
    catch(error){
        res.json({
            message:error.message || error,
            error:true,
            success:false,
        })  
    }
}

//to get all users 
module.exports.allUsers=async(req,res)=>{
    try{
console.log("users id of all users",req.userId)
const userFind=await userModel.find()
res.json({
    message:"all users details",
    data:userFind,
    success:true,
    error:false
})
    }
    catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

//to get user details
module.exports.userDetailsController=async(req,res)=>{
    try{
console.log("userId",req.userId)
const user=await userModel.findById(req.userId)
// console.log("user",user)

res.status(200).json({
    data:user,
    error:false,
    success:true,
    message:"login user"
})
    }
    catch(error){
        res.status(400).json({
            message:error.message || error, 
            error:true,
            success:false
        })
    }
}



