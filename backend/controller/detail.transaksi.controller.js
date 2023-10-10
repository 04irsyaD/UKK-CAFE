const detailModel = require(`../models/index`).detail_transaksi;
const transaksiModel = require(`../models/index`).transaksi;
const Op = require(`sequelize`).Op;
const { path } = require(`../models/detail_transaksi`);
const fs = require(`fs`);
const md5 = require(`md5`);
const mysql = require(`mysql2`);

exports.getAllDetail = async (request, response) => {
  detailModel.findAll()
    .then(result => {
      response.json({
        data: result
      })
    })
    .catch(error => {
      response.json({
        message: error.message
      })
    })
};

exports.findDetail = async (request, response) => {
  let keyword = request.body.keyword;

  let detail = await detailModel.findAll({
    where: {
      [Op.or]: [
        { id_transaksi: { [Op.substring]: keyword } },
        { id_menu: { [Op.substring]: keyword } },
        { harga: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: detail,
    message: `All detail have been loaded`,
  });
};

exports.addDetail = async (request, response) => {
  let data = {
    id_transaksi: request.body.id_transaksi,
    id_menu: request.body.id_menu,
    harga: request.body.harga
  }

  detailModel.create(data)
    .then(result => {
      response.json({
        message: "Data Berhasil Ditambahkan",
        data: result
      })
    })
    .catch(error => {
      response.json({
        message: error.message
      })
    })
};

exports.updateDetail = (request, response) => {
  let data = {
    id_transaksi: request.body.id_transaksi,
    id_menu: request.body.id_menu,
    harga: request.body.harga
  }

  let id_detail = request.params.id;


  detailModel.update(data, { where: { id: id_detail } })
    .then(result => {
      response.json({
        success: true,
        message: "Data Berhasil Diganti",
      })
    })
    .catch(error => {
      response.json({
        message: error.message
      })
    })
};

exports.deleteDetail = (request, response) => {
  let id_detail = request.params.id;

  detailModel
    .destroy({ where: { id: id_detail } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data detail has been deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};