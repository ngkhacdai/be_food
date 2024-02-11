const express = require('express');
const router = express.Router();
const controller = require('../../controllers/cart.controller')
const { verifyToken } = require('../../auth/checkAuth')

router.post('/addtocart', verifyToken, controller.addToCart)

router.get('/getitemincart', verifyToken, controller.getItemInCart)

router.post('/removefromcart', verifyToken, controller.removeFromCart)

router.post('/increasequantity', verifyToken, controller.increaseQuantity)

router.post('/decreasequantity', verifyToken, controller.decreaseQuantity)

module.exports = router