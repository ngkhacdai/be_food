const productSchema = require('../modules/product')
const orderSchema = require('../modules/order')


exports.payOneProduct = async ({ userID, _id, quantity }) => {
    const product = await productSchema.findOne({ _id: _id });
    if (!product) return { message: "Product not found" }
    const newStockQuantity = product.stockQuantity - quantity;
    const updateOneProduct = await productSchema.findOneAndUpdate({ _id: _id }, {
        $set: { soldQuantity: quantity, stockQuantity: newStockQuantity }
    })
    const priceProduct = product.price * quantity;
    const newOrder = await orderSchema.create({
        user: userID,
        products: [
            { product: _id, quantity: quantity, price: priceProduct }
        ],
        totalPrice: priceProduct,
        status: 'Chờ xác nhận'
    })
    if (!newOrder) return 'Mua hàng thất bại'
    return {
        message: 'Mua hàng thành công',
        status: 200,
        newOrder: newOrder
    }
}
exports.getAllOrderByUser = async ({ userID }) => {
    const order = await orderSchema.find({ user: userID }).sort({ "orderDate": -1 })
    if (!order) return { message: 'Không có đơn hàng nào' }
    return {
        order
    }
}
exports.getOrderDetail = async ({ orderID }) => {
    const order = await orderSchema.findOne({ _id: orderID }).populate({
        path: 'products.product',
        model: 'product',
    }).populate('user')
    if (!order) return { message: 'Không tìm thấy đơn hàng' }
    return {
        order
    }
}
exports.getAllOrderByUser = async ({ userID }) => {
    const order = await orderSchema.find({ user: userID }).sort({ "orderDate": -1 })
    if (!order) return { message: 'Không có đơn hàng nào' }
    return {
        order
    }
}
exports.huyDonHang = async ({ _id }) => {
    const orderDetail = await orderSchema.findOneAndUpdate({ _id: _id }, {
        $set: {
            status: 'Đơn hàng đã bị hủy'
        }
    }).populate('user').populate({
        path: 'products.product',
        model: 'product',
    })
    return orderDetail
}
exports.nhanHang = async ({ _id }) => {
    const orderDetail = await orderSchema.findOneAndUpdate({ _id: _id }, {
        $set: {
            status: 'Đã giao hàng'
        }
    }).populate('user').populate({
        path: 'products.product',
        model: 'product',
    })
    return orderDetail
}
exports.giaoHang = async ({ _id }) => {
    const orderDetail = await orderSchema.findOneAndUpdate({ _id: _id }, {
        $set: {
            status: 'Đơn hàng đang được giao'
        }
    }).populate('user').populate({
        path: 'products.product',
        model: 'product',
    })
    return orderDetail
}
exports.payInCart = async ({ userId }) => {
    const cart = await cartSchema.findOne({ user: userId })
    await orderSchema.create({
        user: userId,
        products: cart.items,
        totalPrice: cart.total,
    })
    const productsToUpdate = cart.items.map(item => {
        return {
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { stockQuantity: -item.quantity, soldQuantity: item.quantity } }
            }
        };
    });

    await productSchema.bulkWrite(productsToUpdate);
    await cartSchema.findOneAndUpdate({ user: userId }, {
        $set: {
            items: [],
            total: 0
        }
    })
    return {
        message: 'Đặt hành thành công'
    }
}
exports.getAllOrder = async (req) => {
    const orders = await orderSchema.find().populate('user');
    return orders;
}