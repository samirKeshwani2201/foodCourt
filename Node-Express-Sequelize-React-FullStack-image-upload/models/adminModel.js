module.exports = (sequelize, DataTypes) => {

    const Admin = sequelize.define("admin", {
        admin_id: {
            type: DataTypes.INTEGER,
            AutoIncrement: true,
            primaryKey: true
        },
        admin_username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    Admin.removeAttribute('id');
    return Admin
}