const blogSchema = require('../modules/blogpost')

exports.createBlog = async ({ userId, title, content }) => {
    const blog = await blogSchema.create({
        title, content, author: userId.name,
    })
    if (!blog) return { message: 'Tạo blog thất bại' }
    return {
        message: 'Tạo blog thành công',
        blog
    }
}
exports.getAllBlog = async () => {
    const blog = await blogSchema.find().lean()
    return {
        blog
    }
}