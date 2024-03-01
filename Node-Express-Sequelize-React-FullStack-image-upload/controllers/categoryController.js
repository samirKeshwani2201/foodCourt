const db = require('../models');

// model
const Category = db.category;

// functions

//1. Add Category

const addCategory = async (req, res) => {

    let data = {
        category_id: req.body.category_id,
        category_name: req.body.category_name,
        category_description: req.body.category_description
    };
    const category = await Category.create(data);
    res.status(200).send(category);

};

// 2. Get All Category

const getAllCategory = async (req, res) => {

    const categories = await Category.findAll({});
    res.status(200).send(categories);

};

// 3. update category

const updateCategory = async (req, res) => {

    let id = req.params.category_id;

    const category = await Category.update(req.body, { where: { category_id: id } });

    res.status(200).send(category);

};
// 4. delete category by id

const deleteCategory = async (req, res) => {

    let id = req.params.category_id;

    await Category.destroy({ where: { category_id: id } });

    res.status(200).send('Category is deleted !');

};

// 5 get category by category_name 

const getCategoryByName = async (req, res) => {
    const { category_name } = req.body;
    console.log(category_name);
    const category = await Category.findOne({
        where: { category_name: category_name }
    });
    res.status(200).send({ id: category.category_id });
};


module.exports = {
    addCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getCategoryByName
};