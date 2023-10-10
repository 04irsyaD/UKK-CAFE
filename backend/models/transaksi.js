'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // In the Transaksi model file
this.belongsTo(models.meja, { foreignKey: 'id_meja' });
this.belongsTo(models.user, { foreignKey: 'id_user' });

    }
  }
  transaksi.init({
    tgl_transaksi: DataTypes.DATE,
    id_user: DataTypes.INTEGER,
    id_meja: DataTypes.INTEGER,
    nama_pelanggan: DataTypes.STRING,
    alamat: DataTypes.STRING,
    total: DataTypes.INTEGER,
    status: DataTypes.ENUM('belum_bayar', 'lunas')
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};