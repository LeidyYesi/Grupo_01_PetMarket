module.exports = (sequelize, dataTypes) => {
  let alias = "CartItem";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "cart_items",
    underscore: true,
    timestamps: false,
  };

  const CartItem = sequelize.define(alias, cols, config);

  CartItem.associate = function (models) {
    CartItem.belongsTo(models.Cart, {
      as: "cart",
      foreignKey: "cart_id",
    });

    CartItem.belongsTo(models.Product, {
      as: "product",
      foreignKey: "product_id",
    });
  };

  return CartItem;
};