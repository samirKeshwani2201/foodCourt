module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("category", {
        category_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category_name: {
            type: DataTypes.TEXT
        },
        category_description: {
            type: DataTypes.TEXT
        },
    }, {
        freezeTableName: true
    })
    Category.removeAttribute('id');
    return Category
}
