const accessService = require('../services/access.service')

exports.signup = async (req, res, next) => {
    res.send(await accessService.signup(req.body))
}
exports.login = async (req, res, next) => {
    res.send(await accessService.login(req.body))
}