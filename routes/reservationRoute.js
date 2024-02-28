const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');
//#region
router.get('/', reservationController.getAllReservation);
// router.get('/:id', reservationController.getUserById);
// router.post('/:id/res', reservationController.userReserve);
// router.post('/:id/review', reservationController.submitReview);
// router.post('/add', reservationController.addUser);
// router.post('/login', reservationController.loginUser);
// router.put('/:id', reservationController.updateUser);
// router.delete('/:id', reservationController.deleteUser);
module.exports = router;
