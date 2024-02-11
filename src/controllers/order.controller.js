const orderService = require('../services/order.service')

exports.payOneProduct = async (req, res, next) => {
    res.send(
        await orderService.payOneProduct({
            userID: req.user._id,
            ...req.body
        })
    )
}
exports.getOrderDetail = async (req, res, next) => {
    res.send(
        await orderService.getOrderDetail({
            orderID: req.body._id,
        })
    )
}
exports.getAllOrderByUser = async (req, res, next) => {
    res.send(
        await orderService.getAllOrderByUser({
            userID: req.user._id,
        })
    )
}
exports.huyDonHang = async (req, res, next) => {
    res.send(await orderService.huyDonHang({ _id: req.body._id }))
}
exports.nhanHang = async (req, res, next) => {
    res.send(await orderService.nhanHang({ _id: req.body._id }))
}
exports.giaoHang = async (req, res, next) => {
    res.send(await orderService.giaoHang({ _id: req.body._id }))
}
exports.payInCart = async (req, res, next) => {
    res.send(await orderService.payInCart({
        userId: req.user._id,
    }))
}