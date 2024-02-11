const express = require('express');
const router = express.Router();
const controller = require('./controller')
const { verifyToken } = require('../../auth/checkAuth')