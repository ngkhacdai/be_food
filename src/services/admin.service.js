const userSchema = require('../modules/user')
const productSchema = require('../modules/product')
const categorySchema = require('../modules/categories')
const orderSchema = require('../modules/order')
const blogSchema = require('../modules/blogpost')
const bcrypt = require('bcrypt');
const { createToken } = require('../auth/createToken')
const fs = require('fs')
const path = require('path');
class service {
    static getAllCategory = async () => {
        const categories = await categorySchema.find().lean();
        return categories;
    }
    static getAllUser = async (req) => {
        const user = await userSchema.find().lean();
        return user;
    }
    static getAllOrder = async (req) => {
        const orders = await orderSchema.find().populate('user');
        return orders;
    }
    static getHome = async (req) => {
        const countUser = await userSchema.count();
        const countProduct = await productSchema.count();
        const countOrder = await orderSchema.count();
        const product = await productSchema.find().sort({ soldQuantity: -1 }).lean();
        let total = 0;
        const order = await orderSchema.find()
        await order.map((item) => {
            total += Number(item.totalPrice)
        })
        return {
            countUser, countProduct, countOrder, product, total
        }
    }
    static thongKe = async ({ year }) => {
        const order = await orderSchema.find().lean()
        const orderDate = order.filter((item) => year === Number(new Date(item.orderDate).getFullYear()))
        let total = 0
        await orderDate.map((item) => {
            total += item.totalPrice
        })
        const orderCount = orderDate.length
        return { total, orderCount }
    }
}

module.exports = service;