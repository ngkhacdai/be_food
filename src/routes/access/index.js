const express = require('express');
const router = express.Router();
const controller = require('../../controllers/access.controller')
router.post('/signup', controller.signup)

router.post('/login', controller.login)

module.exports = router;