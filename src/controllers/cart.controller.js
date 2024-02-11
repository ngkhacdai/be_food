const service = require('../services/cart.service')

exports.getItemInCart = async (req, res, next) => {
    res.send(await service.getItemInCart({
        userId: req.user._id,
    }))
}
exports.addToCart = async (req, res, next) => {
    res.send(await service.addToCart({
        userID: req.user._id,
        ...req.body
    }))
}
exports.removeFromCart = async (req, res, next) => {
    res.send(await service.removeFromCart({
        userID: req.user._id,
        ...req.body
    }))
}
exports.increaseQuantity = async (req, res, next) => {
    res.send(await service.increaseQuantity({
        userID: req.user._id,
        ...req.body
    }))
}
exports.decreaseQuantity = async (req, res, next) => {
    res.send(await service.decreaseQuantity({
        userID: req.user._id,
        ...req.body
    }))
}