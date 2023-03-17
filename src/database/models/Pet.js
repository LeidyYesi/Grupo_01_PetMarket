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
      timetamps: false,
    };
  
    const Pet = sequelize.define(alias, cols, config);
  
    
    Pet.associate = function (models) {
      Pet.belongsTo(models.Product, {           // associate con el modelo de Product
        as: "pets",
        foreignKey: "pets_id",
      });
    };
  
    return Pet;
  };
  