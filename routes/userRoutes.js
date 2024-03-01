const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const imageController = require('../controller/image/imageController')
//#region
router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);
router.post('/:id/res', userController.userReserve);
router.post('/:id/review', userController.submitReview);
router.post('/add', userController.addUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// router.post('/images',imageController.addImage);
module.exports = router;
