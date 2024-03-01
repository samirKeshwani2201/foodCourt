// import controllers review, products
const categoryController = require('../controllers/categoryController.js');
const dishesController = require('../controllers/dishesController.js');
const adminController = require('../controllers/loginController.js');

// router
const router = require('express').Router();

//login

router.post('/adminlogin', adminController.adminLogin);
router.get('/checkAdmin', adminController.checkUser);
// Dishes routers
router.post('/addDish', dishesController.addDish);

router.get('/allDishes', dishesController.getAllDishes);

router.get('/Dishes/:id', dishesController.getOneDish);

router.put('/Dishes/:id', dishesController.updateDishes);

router.delete('/Dishes/:id', dishesController.deleteDish);



// Category Url and Controller

router.get('/getAllCategory', categoryController.getAllCategory);
router.post('/getCategoryByName', categoryController.getCategoryByName);



router.post('/addCategory', categoryController.addCategory);

router.post('/updateCategory/:category_id', categoryController.updateCategory);

router.post('/deleteCategory/:category_id', categoryController.deleteCategory);

// get dishes by category
router.get('/getDishesByCategory/:category_id', dishesController.getDishesByCategory);




// Products router


module.exports = router;