const express=require('express')
const authToken=require('../middlewares/authMiddleware')
const {addToCartController,cartProductCountController,deleteCartProductController,updateCartProductController,viewCartProductsController}=require('../controllers/cart.controller')

const router=express.Router()

router.post("/addToCart",authToken,addToCartController)
router.get("/cartCountProducts",authToken,cartProductCountController)
router.get("/view-products",authToken,viewCartProductsController)
router.post("/update-cart-product",authToken,updateCartProductController)
router.post("/delete-cart-product",authToken,deleteCartProductController)



module.exports=router;