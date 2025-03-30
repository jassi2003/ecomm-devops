const mongoose=require('mongoose')

async function connectDB(){
    try{
await mongoose.connect(process.env.MONGODB_URI)
console.log("user connected to user db")
    }
    catch(err){
        console.log(err)
    }
}
module.exports=connectDB