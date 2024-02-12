const express = require('express');
const router = express.Router();
router.use('/v1/api/access', require('./access/index'))
router.use('/v1/api/admin', require('./admin/index'))
router.use('/v1/api/product', require('./product/index.product'))
router.use('/v1/api/order', require('./order/index.order'))
router.use('/v1/api/cart', require('./cart/index.cart'))
router.use('/v1/api/category', require('./category/index.category'))
router.use('/v1/api/blog', require('./blog/index.blog'))
module.exports = router;