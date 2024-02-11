const categorySchema = require('../modules/categories')


exports.addCategory = async (name) => {
    const newCategory = await categorySchema.create(
        name
    )
    if (newCategory) {
        return { status: 200, message: 'Thêm danh mục sản phẩm thành công' }
    } else {
        return { status: 500, message: 'Thêm danh mục sản phẩm thất bại' }
    }
}
exports.getAllCategory = async () => {
    const categories = await categorySchema.find().lean();
    return categories;
}
exports.removeCategory = async ({ _id }) => {
    const category = await categorySchema.findOneAndDelete({ _id: _id });
    return {
        message: 'Xóa danh mục thành công'
    }
}