module.exports = (sequelize, dataTypes) => {
  // Alias para este modelo, utilizado en las asociaciones y controladores
  let alias = "User";

  // Columnas y tipos de datos de la tabla 'users'
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    image: dataTypes.STRING,
    categories_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  // Configuración adicional del modelo, como el nombre de la tabla y la desactivación de timestamps
  let config = {
    timestamps: false,
    underscore: true,
    tableName: "users",
  };

  // Se define el modelo 'User' utilizando el alias, las columnas y la configuración
  const User = sequelize.define(alias, cols, config);

  // Asociaciones del modelo 'User' con otros modelos
  User.associate = function (models) {
    // Relación entre 'User' y 'UsersCategory'
    User.belongsTo(models.UsersCategory, {
      as: "userscategories",
      foreignKey: "id",
    });

    // Relación entre 'User' y 'Cart'
    User.hasOne(models.Cart, {
      as: "cart",
      foreignKey: "user_id",
    });
  };

  // Se devuelve el modelo 'User' para utilizarlo en otros archivos
  return User;
};
