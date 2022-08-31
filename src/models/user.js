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
            unique: true

        },
        userEmail: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
        },
    }, {
        tableName: 'User',
    });

    return User;
};

