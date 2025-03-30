const express=require('express')
const {uploadProductController,getProductController,getProductDetailsController,updateProductController,searchProductController}=require('../controllers/product.controller')
const authToken=require('../middlewares/authMiddleware')


const router=express.Router()

router.post("/upload-product",authToken,uploadProductController)
router.get("/get-product",getProductController)
router.post("/get-proDetails",getProductDetailsController)
router.post("/update-product",authToken,updateProductController)
router.get("/search-product",searchProductController)


module.exports=router;