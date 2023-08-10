"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  Image.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Secondary image is required",
          },
          notEmpty: {
            msg: "Secondary image is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
