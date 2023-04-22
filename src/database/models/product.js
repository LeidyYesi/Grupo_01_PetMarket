module.exports = (sequelize, dataTypes) => {
  // Alias para este modelo, utilizado en las asociaciones y controladores
  let alias = "Product";

  // Columnas y tipos de datos de la tabla 'products'
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
    },
  };

  // Configuración adicional del modelo, como el nombre de la tabla y la desactivación de timestamps
  let config = {
    tableName: "products",
    underscore: true,
    timestamps: false,
  };

  // Se define el modelo 'Product' utilizando el alias, las columnas y la configuración
  const Product = sequelize.define(alias, cols, config);

  // Asociaciones del modelo 'Product' con otros modelos
  Product.associate = function (models) {
    // Relación 'belongsToMany' entre 'Product' y 'Color'
    Product.belongsToMany(models.Color, {
      as: "colors",
      through: models.ProductColor,
      foreignKey: "product_id",
      otherKey: "color_id",
      timestamps: false,
    });

    // Relación 'belongsTo' entre 'Product' y 'Pet'
    Product.belongsTo(models.Pet, {
      as: "pets",
      foreignKey: "pets_id",
    });

    // Relación 'belongsTo' entre 'Product' y 'Weight'
    Product.belongsTo(models.Weight, {
      as: "weights",
      foreignKey: "weights_id",
    });

    // Relación 'belongsTo' entre 'Product' y 'Category'
    Product.belongsTo(models.Category, {
      as: "categories",
      foreignKey: "categories_id",
    });

    // Relación 'belongsTo' entre 'Product' y 'Size'
    Product.belongsTo(models.Size, {
      as: "sizes",
      foreignKey: "sizes_id",
    });

    // Relación 'hasMany' entre 'Product' y 'CartItem'
    Product.hasMany(models.CartItem, {
      as: 'cart_items',
      foreignKey: 'product_id'
    });
  };

  // Se devuelve el modelo 'Product' para utilizarlo en otros archivos
  return Product;
};
