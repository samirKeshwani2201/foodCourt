module.exports = (sequelize, DataTypes) => {

    const Dishes = sequelize.define("dishes", {
        dish_image: {
            type: DataTypes.STRING
        },
        dish_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dish_id: {
            type: DataTypes.INTEGER,
            AutoIncrement: true,
            primaryKey: true

        },
        dish_description: {
            type: DataTypes.STRING
        },
    }, {
        freezeTableName: true
    })
    Dishes.removeAttribute('id');
    return Dishes

}