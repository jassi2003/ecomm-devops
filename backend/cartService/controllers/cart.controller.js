const addToCartModel = require("../models/cart.model")
const { subscribeToQueue } = require("../rabbitmq");



//add to cart
module.exports.addToCartController=async(req,res)=>{
    try{
const {productId}=req?.body
const currentUser=req.userId

const isProductAvailable= await addToCartModel.findOne({productId})
// console.log("addtocrt",isProductAvailable)
if(isProductAvailable){
    return res.json({
        message:"product already exists",
        success:false,
        error:true
    })
}

const payload={
    productId:productId,
    quantity:1,
    userId:currentUser
}

const newAddToCart=new addToCartModel(payload)

const saveProduct=await newAddToCart.save()
return res.json({
    error:false,
    success:true,
    data:saveProduct,
    message:"product added to cart successfully"
})

    }
    catch(err){
        res.status(400).json({
            error:true,
            success:false,
            message:err.message ||err
        })
    }
}

//count the no of products in cart
module.exports.cartProductCountController= async(req,res)=>{
    try{
const userId=req.userId
const count=await cartModel.countDocuments({userId:userId})
    console.log(count,"count");
res.json({
    data:{count:count},
    message:"ok",
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

// delete cart product
module.exports.deleteCartProductController= async(req,res)=>{
    try{
const currentUser=req.userId
const productId=req?.body?._id

const deleteProduct=await cartModel.deleteOne({_id:productId})

res.json({
    message:"product from cart deleted",
    data:deleteProduct,
    error:false,
    success:true
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

//update cart product
module.exports.updateCartProductController= async(req,res)=>{
    try{
const currentUser=req.userId
const productId=req?.body?._id
const qnty=req.body.quantity

const UpdateProduct=await cartModel.updateOne({_id:productId},{...(qnty &&{quantity:qnty})})

res.json({
    message:"ok",
    data:UpdateProduct,
    error:false,
    success:true
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

//view cart product
module.exports.viewCartProductsController = async (req, res) => {
    try {
        const currentUser = req.userId

        const allProducts = await addToCartModel.find({ userId:currentUser }).populate("productId")

        return res.json({
            message: "ok",
            success: true,
            error: false,
            data: allProducts
        })

    }
    catch (err) {
        res.status(400).json({
            error: true,
            success: false,
            message: err.message || err
        })
    }
}


    subscribeToQueue("USER_CREATED",(userData) => {
      console.log(" USER_CREATED received in Cart:", userData);
    }); 
  
  
