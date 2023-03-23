module.exports = (sequelize, dataTypes) => {
    let alias = 'UsersCategory';
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
        tableName: 'userscategories' 
    }

    const UsersCategory = sequelize.define(alias, cols, config);

    UsersCategory.associate = function(models) {
        UsersCategory.hasMany(models.User, { 
            as: "users", 
            foreignKey: "categories_id"
        })
    }

    return UsersCategory;
};