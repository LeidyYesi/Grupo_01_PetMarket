// model Pets.js
module.exports = (sequelize, dataTypes) => {
    let alias = "Pet";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pet: {
        type: dataTypes.STRING,
      },
    };
  
    let config = {
      tableName: "pets",
      underscore: true,
      timestamps: false,
    };
  
    const Pet = sequelize.define(alias, cols, config);
  
    
    Pet.associate = function (models) {
      Pet.hasMany(models.Product, {
        //associate con el modelo de Pet
        as: "products",
        foreignKey: "pets_id",
      });
    };
  
    return Pet;
  };
  