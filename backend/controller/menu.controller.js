const menuModel = require(`../models/index`).menu
const Op = require(`sequelize`).Op
const { path } = require(`../models/menu`)
const upload = require(`./upload.foto`).single(`gambar`)
const fs = require(`fs`)
const md5 = require(`md5`)

exports.getAllMenu = async (request, response) => {
    let menu = await menuModel.findAll()
    return response.json({
        success: true,
        data: menu,
        message: `All menu have been loaded`
    })
}

exports.findMenu = async (request, response) => {

    let nama_menu = request.body.nama_menu
    let jenis = request.body.jenis
    let deskripsi = request.body.deskripsi
    let harga = request.body.harga

    let menu = await menuModel.findAll({
        where: {
            [Op.or]: [
                { nama_menu: { [Op.substring]: nama_menu } },
                { jenis: { [Op.substring]: jenis } },
                { deskripsi: { [Op.substring]: deskripsi } },
                { harga: { [Op.substring]: harga } },

            ]
        }
    })
    return response.json({
        success: true,
        data: menu,
        message: `menu have been loaded`
    })
}

exports.findMenubyId = async (request, response) => {
    let id_menu = request.params.id;

    menuModel
        .findOne({ where: { id: id_menu } })
        .then((result) => {
            return response.json({
                success: true,
                data: result,
            });
        })
        .catch((error) => {
            return response.json({
                success: false,
                message: error.message,
            });
        });
};

exports.addMenu = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }

        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }
        let newMenu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            gambar: request.file.filename,
            harga: request.body.harga,
        }

        menuModel.create(newMenu).then(result => {
            return response.json({
                success: true,
                data: result,
                message: `Menu telah ditambahkan`
            })
        })

            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

exports.updateMenu = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }

        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }
        let dataMenu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            gambar: request.file.filename,
            harga: request.body.harga,
        }

        let id = request.params.id

        menuModel.update(dataMenu, { where: { id: id } })
            .then(result => {

                return response.json({
                    success: true,
                    message: `Data menu has been updated`
                })
            })
            .catch(error => {

                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

exports.deleteMenu = (request, response) => {

    let id = request.params.id

    menuModel.destroy({ where: { id: id } })
        .then(result => {

            return response.json({
                success: true,
                message: `Data menu has been deleted`
            })
        })
        .catch(error => {

            return response.json({
                success: false,
                message: error.message
            })
        })
}