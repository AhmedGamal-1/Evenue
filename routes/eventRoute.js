const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController');
//#region
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventsById);
router.post('/add', eventController.addEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
module.exports = router;
