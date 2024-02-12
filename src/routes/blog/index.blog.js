const express = require('express');
const router = express.Router();
const controller = require('../../controllers/blog.controller')
const { verifyToken, checkAdminRole } = require('../../auth/checkAuth')

router.get('/getallblog', verifyToken, controller.getAllBlog)

router.post('/createblog', checkAdminRole, controller.createBlog)


module.exports = router