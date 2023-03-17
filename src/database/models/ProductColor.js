module.exports = (sequelize, dataTypes) => {
    let alias = "products_colors";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: dataTypes.INTEGER,
      },
      color_id:{
        type: dataTypes.INTEGER,
      }

    };
  
    let config = {
      tableName: "products_colors",
      underscore: true,
      timetamps: false,
    };
  
    const ProductsColor = sequelize.define(alias, cols, config);
  
   /* ProductsColor.associate = function (models) {
      ProductsColor.hasMany(models.Product, {
        as: "products",
        foreignKey: "product_id"
      })
    };*/


    return ProductsColor;
  };
  