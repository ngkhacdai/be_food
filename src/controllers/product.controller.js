const productService = require('../services/product.service')


exports.addproduct = async (req, res, next) => {
    if (!req.file.path) {
        console.error('Image object or path is missing.');
        return res.status(500).send(
            { message: 'Image object or path is missing.' }
        )
    }
    const image = req.file.path
    res.send(await productService.addProduct(req.body, image))
}
exports.getAllProduct = async (req, res, next) => {
    res.send(await productService.getAllProduct())
}
exports.getProductByID = async (req, res, next) => {
    res.send(await productService.getProductByID(req))
}
exports.updateProduct = async (req, res, next) => {
    if (!req.file.path) {
        console.error('Image object or path is missing.');
        return res.status(500).send(
            { message: 'Image object or path is missing.' }
        )
    }
    const image = req.file.path
    res.send(await productService.updateProduct(req.body, image))
}
exports.deleteProduct = async (req, res, next) => {
    res.send(await productService.deleteProduct(req))
}