const service = require('../services/admin.service')

class controller {

    getAllCategory = async (req, res, next) => {
        res.send(await service.getAllCategory())
    }
    getAllUser = async (req, res, next) => {
        res.send(await service.getAllUser(req))
    }
    getAllOrder = async (req, res, next) => {
        res.send(await service.getAllOrder(req))
    }
    getHome = async (req, res, next) => {
        res.send(await service.getHome())
    }
    thongKe = async (req, res, next) => {
        res.send(await service.thongKe({
            year: req.body.year,
        }));
    }
}

module.exports = new controller;