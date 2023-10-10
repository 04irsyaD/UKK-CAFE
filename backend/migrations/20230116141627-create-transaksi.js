'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tgl_transaksi: {
        type: Sequelize.DATE
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model: "users",
          key: "id"
        }
      },
      id_meja: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model: "mejas",
          key: "id"
        }
      },
      nama_pelanggan: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('belum_bayar','lunas')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaksis');
  }
};