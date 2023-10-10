'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // In the Meja model file
this.hasMany(models.transaksi, { foreignKey: 'id_meja' });

    }
  }
  meja.init({
    nomor_meja: DataTypes.STRING,
    status: DataTypes.ENUM('tersedia', 'tidak_tersedia')
  }, {
    sequelize,
    modelName: 'meja',
  });
  return meja;
};