const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Dishes = db.dishes


// main work

// 1. create dishes

const addDish = async (req, res) => {

    let info = {
        dish_images: req.file.path,
        dish_name: req.body.dish_name,
        dish_price: req.body.price,
        category_id: req.body.category_id,
        dish_description: req.body.description,
    }
    const dishes = await Dishes.create(info)
    res.status(200).send(dishes)

}



// 2. get all dishes

const getAllDishes = async (req, res) => {

    let dishes = await Dishes.findAll({})
    res.status(200).send(dishes)

}

// 3. get single dish

const getOneDish = async (req, res) => {

    let id = req.params.id
    let dishes = await Dishes.findOne({ where: { dish_id: id } })
    res.status(200).send(dishes)

}

// 4. update dishes

const updateDishes = async (req, res) => {

    let id = req.params.id

    const dishes = await Dishes.update(req.body, { where: { dish_id: id } })

    res.status(200).send(dishes)

}

// 5. delete dish by id

const deleteDish = async (req, res) => {

    let id = req.params.id

    await Dishes.destroy({ where: { dish_id: id } })

    res.status(200).send(' Dishes is deleted !')

}


// 6. connect one to many relation Product and Reviews

const getDishesByCategory = async (req, res) => {

    const id = req.params.category_id

    const data = await Dishes.findOne({
        include: [{
            model: categoryModel,
            as: 'category'
        }],
        where: { category_id: id }
    })

    res.status(200).send(data)

}


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


module.exports = {
    addDish,
    getAllDishes,
    getOneDish,
    updateDishes,
    deleteDish,
    getDishesByCategory,
    upload
}