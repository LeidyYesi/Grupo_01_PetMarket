module.exports = (sequelize, dataTypes) => {

  let alias = "Product";   // este alias se usa en los controladores

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
    },
    description: {
      type: dataTypes.STRING,
    },
    categories_id: {
      type: dataTypes.INTEGER,
    },
    pets_id: {
      type: dataTypes.INTEGER,
    },
    weights_id: {
      type: dataTypes.INTEGER,
    },
    sizes_id: {
      type: dataTypes.INTEGER,
    },
    price: {
      type: dataTypes.INTEGER,
    },
    discount: {
      type: dataTypes.INTEGER,
    },
    img: {
      type: dataTypes.STRING,
    }
  };

  let config = {
    tableName: "products",
    underscore: true,
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

 Product.associate = function (models){
  Product.belongsToMany(models.Color, { // models.Color -> Actors es el Color de alias en Color.js
    as: "productsColors",
    through: 'products_colors',
    foreignKey: 'product_id',
    otherKey: 'color_id',
    timestamps: false
})
 Product.associate = function (models) {
      Product.hasMany(models.Pet, {   //associate con el modelo de Pets
        as: "productPet",
        foreignKey: "pets_id"
      })
    };

    Product.associate = function (models) {
      Product.hasMany(models.Pet, {   //associate con el modelo de Pet
        as: "productPet",
        foreignKey: "pets_id"
      })
    };

    Product.associate = function (models) {
      Product.hasMany(models.Weight, {   //associate con el modelo de Weight
        as: "weightsProduct",
        foreignKey: "weights_id"
      })
    };

    Product.associate = function (models) {
      Product.hasMany(models.Category, {      //associate con el modelo de Category
        as: "categories",
        foreignKey: "categories_id"
      })
    };

    Product.associate = function (models) {
      Product.hasMany(models.Size, {        //associate con el modelo de Size
        as: "sizeProduct",
        foreignKey: "size_id"
      })
    };
};

  return Product;
}