const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
//#region
router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);
router.post('/:id/res', userController.userReserve);
router.post('/:id/review', userController.submitReview);
router.post('/add', userController.addUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
module.exports = router;
