const categoryService = require('../services/category.service')


exports.removeCategory = async (req, res, next) => {
    res.send(await categoryService.removeCategory(
        { _id: req.body._id }
    ))
}
exports.addCategory = async (req, res, next) => {
    res.send(await categoryService.addCategory(req.body))
}
exports.getAllCategory = async (req, res, next) => {
    res.send(await categoryService.getAllCategory())
}

