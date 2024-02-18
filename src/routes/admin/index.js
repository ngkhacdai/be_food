const express = require('express');
const router = express.Router();
const { checkAdminRole } = require('../../auth/checkAuth')
const controller = require('../../controllers/admin.controller')

router.get('/getcategory', checkAdminRole, controller.getAllCategory)

router.get('/getallorder', checkAdminRole, controller.getAllOrder)

router.get('/getalluser', checkAdminRole, controller.getAllUser)

router.get('/home', checkAdminRole, controller.getHome)

router.post('/thongke', checkAdminRole, controller.thongKe)

module.exports = router;