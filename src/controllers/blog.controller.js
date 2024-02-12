const blogService = require('../services/blog.service')

exports.createBlog = async (req, res, next) => {
    res.send(await blogService.createBlog({
        userId: req.user,
        ...req.body
    }));
}
exports.getAllBlog = async (req, res, next) => {
    res.send(await blogService.getAllBlog());
}