module.exports = (sequelize, dataTypes) => {
  let alias = 'User';
  let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: dataTypes.STRING,
        allowNull: false
      },
      image: dataTypes.STRING,
      categories_id: {
        type: dataTypes.INTEGER,
        allowNull: false
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false
      }
  };
  /*let config = {
      tableName: 'users',
      timestamps: false
  };*/

  let config = {
    timestamps: false,
    underscore: true,
    tableName: 'users'
}

const User = sequelize.define(alias, cols, config); 

User.associate = function (models) {
    User.belongsTo(models.Category, { // models.Genre -> Genres es el valor de alias en genres.js
        as: "categories",
        foreignKey: "categories_id"
    })
}
return User
}