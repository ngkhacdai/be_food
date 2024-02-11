const cartSchema = require('../modules/cart')
const productSchema = require('../modules/product')

exports.getItemInCart = async ({ userId }) => {
    const cart = await cartSchema.findOne({ user: userId }).populate({
        path: 'items.product',
        model: 'product'
    })
    if (!cart) {
        const newcart = await cartSchema.create({
            user: userId,
            total: 0
        })
        return newcart
    }
    return cart
}
exports.addToCart = async ({ userID, _id }) => {
    const product = await productSchema.findById({ _id: _id });
    if (!product) {
        return { message: 'Không tìm thấy sản phẩm' }
    }
    let cart = await cartSchema.findOne({ user: userID })
    if (!cart) {
        cart = await cartSchema.create({ user: userID, items: [], total: 0 });
    }
    const existingItem = cart.items.find(item => item.product.toString() === _id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            product: _id
        });
    }
    cart.total += product.price;
    await cart.save();
    return {
        message: 'Sản phẩm đã được thêm vào giỏ hàng'
    }
}
exports.removeFromCart = async ({ userID, _id }) => {
    const product = await productSchema.findOne({ _id: _id })
    const cart = await cartSchema.findOne({ user: userID })
    const total = cart.total - cart.items.find(item => item.product == _id).quantity * product.price
    await cartSchema.findOneAndUpdate({ user: userID }, {
        $pull: {
            items: {
                product: _id
            },
        },
        $set: {
            total: total
        }
    })
    return {
        message: 'Xóa sản phẩm thành công',
    }
}
exports.increaseQuantity = async ({ userID, _id }) => {
    const product = await productSchema.findOne({ _id: _id })
    const cart = await cartSchema.findOne({ user: userID })
    const total = cart.total + product.price
    const newQuan = (cart.items.find(item => item.product == _id).quantity + 1)
    await cartSchema.findOneAndUpdate({ user: userID, 'items.product': _id }, {
        $set: {
            total: total,
            'items.$.quantity': newQuan
        }
    })
    return {
        message: 'Tăng số lượng sản phẩm thành công',
    }
}
exports.decreaseQuantity = async ({ userID, _id }) => {
    const product = await productSchema.findOne({ _id: _id })
    const cart = await cartSchema.findOne({ user: userID })
    const total = cart.total - product.price
    const newQuan = (cart.items.find(item => item.product == _id).quantity - 1)
    await cartSchema.findOneAndUpdate({ user: userID, 'items.product': _id }, {
        $set: {
            total: total,
            'items.$.quantity': newQuan
        }
    })
    return {
        message: 'Tăng số lượng sản phẩm thành công',
    }
}