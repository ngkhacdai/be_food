const express = require('express');
const app = express();
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const cors = require('cors')
require('dotenv').config();

helmet({
    crossOriginResourcePolicy: false,
})
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json())

app.use(
    express.urlencoded({
        extended: true
    }),
)
app.use(compression(),
    express.json());
require('./db/database');
app.use('', require('./routes/index'));
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error'
    })
})
module.exports = app;