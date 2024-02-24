const userModel = require('../models/userModel');
const eventController = require('../controller/eventController');
const ticketController = require('./reservationController');
const Event = require('../models/eventModel');
const Review = require('../models/reviewModel');
let getAllUser = async (req, res) => {
	let users = await userModel.find({});
	if (users) {
		res.status(200).json({ result: users.length, data: users });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let userReserve = async (req, res) => {
	const ID = req.params.id;
	let data = req.body;
	let eventsReq = data.tickets;
	let eventData = await eventController.getEventsByIdRes(data.eventId);
	if (eventData) {
		let result = await ticketController.reserveTickets(
			ID,
			eventData,
			eventsReq,
		);
		console.log(result);
		if (result.message == 'success') {
			res.status(200).json({
				message: 'success',
				data: result.totalPrice,
			});
		} else {
			res.status(404).json({ message: 'fail' });
		}
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let getUserById = async (req, res) => {
	const ID = req.params.id;
	let user = await userModel.findOne({ _id: ID });
	if (user) {
		res.status(200).json({ data: user });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let addUser = (req, res) => {
	let newUser = req.body;
	const user = new userModel(newUser);
	user.save();
	res.status(201).json({ message: 'success', data: newUser });
	res.status(404).json({ message: 'fail' });
};
let updateUser = async (req, res) => {
	const ID = req.params.id;
	const data = req.body;
	let user = await userModel.findOneAndUpdate({ _id: ID }, data, {
		new: true,
	});
	if (user) {
		res.status(200).json({ data: user });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let deleteUser = async (req, res) => {
	const ID = req.params.id;
	let user = await userModel.findOneAndDelete({ _id: ID });
	if (user) {
		res.status(200).json({ message: 'success' });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};

let submitReview = async (req, res) => {
	const data = req.body;
	const ID = req.params.id;
	try {
		const review = new Review({
			eventId: data.eventId,
			userId: ID,
			rating: data.rating,
			comment: data.comment,
		});
		await review.save();
		// Add the review ObjectId to the event's reviews array
		await Event.findByIdAndUpdate(data.eventId, {
			$push: { reviews: review._id },
		});
		await userModel.findByIdAndUpdate(ID, {
			$push: { reviews: review._id },
		});

		res.status(200).json({ message: 'success' });
	} catch (error) {
		res.status(404).json({ message: 'fail' });
	}
};
module.exports = {
	getAllUser,
	getUserById,
	addUser,
	updateUser,
	deleteUser,
	userReserve,
	submitReview,
};