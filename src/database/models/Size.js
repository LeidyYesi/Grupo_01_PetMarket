// model size.js
module.exports = (sequelize, dataTypes) => {
  let alias = "Size";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    size: {
      type: dataTypes.STRING,
    },
  };

  let config = {
    tableName: "sizes",
    underscore: true,
    timestamps: false,
  };

  const Size = sequelize.define(alias, cols, config);

  
  Size.associate = function (models) {
    Size.hasMany(models.Product, {
      //associate con el modelo de Product
      as: "products",
      foreignKey: "sizes_id",
    });
  };

  return Size;
};
