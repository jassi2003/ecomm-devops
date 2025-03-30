const mongoose=require('mongoose')

const addToCartSchema=mongoose.Schema({
   productId:{
ref:"product",
type:String
   },
   quantity:Number,
   userId:String,
},{
    timestamps:true
})
const cartModel=mongoose.model("addtocart",addToCartSchema)

module.exports=cartModel