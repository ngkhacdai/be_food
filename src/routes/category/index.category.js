const express = require('express');
const router = express.Router();
const controller = require('../../controllers/category.controller')
const { checkAdminRole } = require('../../auth/checkAuth')


router.get('/getcategory', checkAdminRole, controller.getAllCategory)

router.post('/addcategory', checkAdminRole, controller.addCategory)

router.delete('/removecategory', checkAdminRole, controller.removeCategory)


module.exports = router