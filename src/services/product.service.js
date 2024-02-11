const productSchema = require('../modules/product.js')

exports.getAllProduct = async () => {
    const product = await productSchema.find().lean();
    return product;
}
exports.addProduct = async ({ name, description, price, category, stockQuantity }, image) => {
    const newProduct = await productSchema.create({
        name,
        description,
        price,
        category,
        image,
        stockQuantity
    }
    )
    if (newProduct) {
        return { status: 200, message: 'Thêm sản phẩm thành công' }
    } else {
        return { status: 500, message: 'Thêm sản phẩm thất bại' }
    }
}
exports.getProductByID = async (req) => {
    const product = await productSchema.findOne(req.body._id).lean();
    return product;
}

exports.updateProduct = async ({ _id, name, description, price, category, stockQuantity }, image) => {
    const updateroduct = await productSchema.findOneAndUpdate({ _id: _id }, {
        $set: {
            name,
            description,
            price,
            category,
            image,
            stockQuantity
        }
    }
    )
    if (updateroduct) {
        return { status: 200, message: 'Update sản phẩm thành công' }
    } else {
        return { status: 500, message: 'Update sản phẩm thất bại' }
    }
}
exports.deleteProduct = async (req) => {
    await productSchema.findOneAndDelete(req.body._id);
    const product = await productSchema.find().lean();
    return {
        message: 'delete product successfully',
        status: 200,
        product
    }
}