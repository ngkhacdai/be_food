const express = require('express');
const router = express.Router();
const controller = require('../../controllers/order.controller')
const { verifyToken, checkAdminRole } = require('../../auth/checkAuth')

router.post('/payoneproduct', verifyToken, controller.payOneProduct)

router.get('/getallorder', checkAdminRole, controller.getAllOrder)

router.post('/getorderdetail', verifyToken, controller.getOrderDetail)

router.get('/getallorderbyuser', verifyToken, controller.getAllOrderByUser)

router.post('/huydonhang', verifyToken, controller.huyDonHang)

router.post('/nhanhang', verifyToken, controller.nhanHang)

router.post('/giaohang', checkAdminRole, controller.giaoHang)

router.get('/payincart', verifyToken, controller.payInCart)

module.exports = router