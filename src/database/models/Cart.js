module.exports = (sequelize, dataTypes) => {
  let alias = "Cart";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "carts",
    underscore: true,
    timestamps: false,
  };

  const Cart = sequelize.define(alias, cols, config);

  Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });

    Cart.hasMany(models.CartItem, {
      as: "cart_items",
      foreignKey: "cart_id",
    });
  };

  return Cart;
};