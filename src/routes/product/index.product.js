const express = require('express');
const router = express.Router();
const controller = require('../../controllers/product.controller')
const { verifyToken, checkAdminRole } = require('../../auth/checkAuth')
const upload = require('../../utils/multer.util')

router.get('/getallproduct', verifyToken, controller.getAllProduct)

router.post('/addproduct', upload.single('image'), checkAdminRole, controller.addproduct)

router.get('/getproductbyid', verifyToken, controller.getProductByID)

router.put('/updateproduct', upload.single('image'), checkAdminRole, controller.updateProduct)

router.post('/deleteproduct', checkAdminRole, controller.deleteProduct)


module.exports = router