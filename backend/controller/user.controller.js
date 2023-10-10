const userModel = require(`../models/index`).user;
const Op = require(`sequelize`).Op;
const { path } = require(`../models/user`);
const fs = require(`fs`);
const md5 = require(`md5`);
const mysql = require(`mysql2`);

const jsonwebtoken = require("jsonwebtoken");
const { builtinModules } = require("module");
const SECRET_KEY = "koderahasia";

exports.login = async (request, response) => {

  let result = await userModel.findAll({ where: {
    username: request.body.username,
    password: md5(request.body.password)
  } });

  console.log(result)

  if (result) { 
    let payload = JSON.stringify(result); 
    let token = jsonwebtoken.sign(payload, SECRET_KEY); 
    response.status(200).json({ 
      status: "success",
      logged: true,
      token: token,
      data: result,
    });
  } else {
    response.status(400).json({ 
      status: "error",
      message: "Password salah",
    });
  }
};

//mendaptkan semua data dalam tabel
exports.getAllUser = async (request, response) => {
    userModel.findAll()
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

exports.findUser = async (request, response) => {
  let keyword = request.body.keyword;

  let user = await userModel.findAll({
    where: {
      [Op.or]: [
        { nama_user: { [Op.substring]: keyword } },
        { role: { [Op.substring]: keyword } },
        { username: { [Op.substring]: keyword } },
        { password: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: user,
    message: `All user have been loaded`,
  });
};

exports.findUserbyId = async (request, response) => {
  let id_user = request.params.id;

  userModel
    .findOne({ where: { id: id_user } })
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

exports.addUser = async (request, response) => {
    let data = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password)
    }
    userModel.create(data)
    .then(result => {
        response.json ({
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

exports.updateUser = (request, response) => {
    let data = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        password: md5(request.body.password)
    }

    let idUser = request.params.id;


    userModel.update(data, { where: { id: idUser } })
    .then(result => {
        response.json ({
            message: "Data Berhasil Diganti",
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
};

exports.deleteUser = (request, response) => {
  let id = request.params.id;

  userModel
    .destroy({ where: { id: id } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data user has been deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};