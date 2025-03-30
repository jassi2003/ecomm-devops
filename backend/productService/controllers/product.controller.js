const productModel = require("../models/product.model"); // Updated path
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

//to upload product
module.exports.uploadProductController=async(req,res)=>{
    try{
        console.log("Request body:", req.body); // Debugging
        // const sessionUserId=req.userId
        // if(!uploadProductPermission(sessionUserId)){
        //     throw new Error("permission denied")
        // }


const uploadProduct=new productModel(req.body)
const saveProduct=await uploadProduct.save()
res.status(201).json({
    message:"product uploaded successfully",
    success:true,
    error:false,
    data:saveProduct
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

//to get product
module.exports.getProductController=async(req,res)=>{
    try{
const allProduct= await productModel.find().sort({createdAt:-1})

res.json({
    success:true,
    error:false,
    data:allProduct,
    message:"all products"
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

//get product details
module.exports.getProductDetailsController= async(req,res)=>{
    try{
const {productId}=req.body;
const getDetails=await productModel.findById(productId)

res.json({
    success:true,
    error:false,
    data:getDetails,
    message:"product details ok"
})
    }
    catch(err){
        res.json({
            success:false,
            error:true,
            message:err?.message || err,
        })
    }

}

//update product 
module.exports.updateProductController=async(req,res)=>{
    try{

if(!uploadProductPermission(req.userId)){
    throw new Error("permission denied")
}
const{_id, ...resBody}=req.body

const updateProdut= await productModel.findByIdAndUpdate(_id,resBody)

res.status(201).json({
    message:"product updated successfully",
    error:false,
    success:true,
    data:updateProdut
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


//search product
module.exports.searchProductController= async(req,res)=>{
    try{

const query=req.query.q
// console.log("backend query",query)
const regex=new RegExp(query,"i","g")
const product= await productModel.find({
    "$or" : [
        {productName:regex},
        { category:regex}
    ]
})
res.json({
    message:"ok",
    error:false,
    success:true,
    data:product
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

