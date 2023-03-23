module.exports = (sequelize, dataTypes) => {
  let alias = "Weight";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    weight: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "weights",
    underscore: true,
    timestamps: false,
  };

  const Weight = sequelize.define(alias, cols, config);

  Weight.associate = function (models) {
    Weight.hasMany(models.Product, {
      //associate con el modelo de Weight
      as: "products",
      foreignKey: "weights_id",
    });
  };

  return Weight;
};
