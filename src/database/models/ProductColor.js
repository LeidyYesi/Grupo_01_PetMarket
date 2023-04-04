module.exports = (sequelize, dataTypes) => {
  let alias = "ProductColor";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: dataTypes.INTEGER,
    },
    color_id: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "products_colors",
    underscore: true,
    timestamps: false,
  };

  const ProductColor = sequelize.define(alias, cols, config);

  ProductColor.associate = function (models) {
    ProductColor.belongsTo(models.Product, {
      as: "product",
      foreignKey: "product_id",
    });
    ProductColor.belongsTo(models.Color, {
      as: "color",
      foreignKey: "color_id",
    });
  };

  return ProductColor;
};
