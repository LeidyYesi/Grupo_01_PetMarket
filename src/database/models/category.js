module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: dataTypes.STRING,
            allowNull: false
        }   
    };
    let config = {
        timestamps: false,
        underscore: true,
        tableName: 'categories' 
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
        Category.hasMany(models.User, { 
            as: "users", 
            foreignKey: "categories_id"
        })
    }

    return Category;
};