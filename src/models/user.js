const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userEmail: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
        },
        userPassword:{
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        tableName: 'User',
    });

    return User;
};

