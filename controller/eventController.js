const eventModel = require('../models/eventModel');
// const ticketModel=require("../models/ticketModel");
//hi
let getEvents = async (req, res) => {
	let events = await eventModel.find({});
	if (events) {
		res.status(200).json({
			result: events.length,
			data: events,
		});
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let getEventsByIdRes = async id => {
	let event = await eventModel.findOne({ _id: id });
	if (event) {
		return event;
	} else {
		return { message: 'cant get event with this id' };
	}
};
let getEventsById = async (req, res) => {
	const ID = req.params.id;
	let event = await eventModel.findOne({ _id: ID });
	if (event) {
		res.status(200).json({ data: event });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let addEvent = (req, res) => {
	try {
		// let {ticket,...obj}=req.body;
		// console.log("my evennnnt",myEvent);
		let myEvent = req.body;
		myEvent = new eventModel(myEvent);
		myEvent.save();
		res.status(201).json({ message: 'success', data: myEvent });

		// const newTicket={event:myEvent._id,...ticket};
		// const tickets= new ticketModel(newTicket);
		// tickets.save();
	} catch (err) {
		console.log(err);
		res.status(404).json({ message: 'fail' });
	}
};

let updateEvent = async (req, res) => {
	const ID = req.params.id;
	const data = req.body;
	let event = await eventModel.findOneAndUpdate({ _id: ID }, data, {
		new: true,
	});
	if (event) {
		res.status(200).json({ data: event });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let deleteEvent = async (req, res) => {
	const ID = req.params.id;
	let event = await eventModel.findOneAndDelete({ _id: ID });
	if (event) {
		res.status(200).json({ message: 'success' });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
module.exports = {
	getEvents,
	getEventsById,
	addEvent,
	updateEvent,
	deleteEvent,
	getEventsByIdRes,
};