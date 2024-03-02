const eventModel = require('../models/eventModel');
const reservationModel = require('../models/reservationTicket');

// async function reserveTickets(userId, eventData, ticketsreq) {
// 	try {
// 		const totalPrice = calculateTotalPrice(eventData, ticketsreq);
// 		//credit card payment if credit card returns true

// 		await updateEventAndCreateReservations(userId, eventData, ticketsreq);
// 		//else message credit card has no credit
// 		return { message: 'success', totalPrice: totalPrice };
// 	} catch (err) {
// 		return { message: err };
// 	}
// }
// function calculateTotalPrice(event, ticketsreq){
// 	let totalPrice = 0;
// 	for (const ticketInfo of ticketsreq) {
// 		const ticket = event.tickets.find(t => t.type === ticketInfo.type);
// 		if (!ticket || ticket.totalTickets < ticketInfo.quantity) {
// 			return -1;
// 		}
// 		totalPrice += ticketInfo.quantity * ticket.price;
// 	}
// 	return totalPrice;
// }
// async function updateEventAndCreateReservations(userId, eventData, ticketsreq) {
// 	for (const ticketInfo of ticketsreq) {
// 		const ticket = eventData.tickets.find(t => t.type === ticketInfo.type);
// 		ticket.totalTickets -= ticketInfo.quantity;
// 		ticket.reserved += ticketInfo.quantity;
// 	}
// 	await eventData.save();
// 	for (const ticketInfo of ticketsreq) {
// 		const ticket = eventData.tickets.find(t => t.type === ticketInfo.type);
// 		const reservation = new reservationModel({
// 			userId: userId,
// 			eventId: eventData._id,
// 			quantity: ticketInfo.quantity,
// 			totalPrice: ticketInfo.quantity * ticket.price,
// 			isPurchased:false
// 		});
// 		console.log(reservation);
// 		await reservation.save();
// 	}
// }

let getAllReservation = async (req, res) => {
	let reservations = await reservationModel.find({}).populate('events.eventId');
	if (reservations) {
		res.status(200).json({ message:"success",length: reservations.length, data: reservations });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let getAllReservationByUserId = async (req, res) => {
	const ID = req.params.id;
	console.log(req);
	let reservations = await reservationModel.find({userId:ID}).populate('events.eventId');
	if (reservations) {
		res.status(200).json({ message:"success",length: reservations.length, data: reservations });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let updateReservation = async (req, res) => {
	const ID = req.params.id;
	const data = req.body;
	//in frontend in from group add isPurchased true
	let user = await userModel.findOneAndUpdate({ _id: ID }, data, {
		new: true,
	});
	if (user) {
		res.status(200).json({ data: user });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};

async function updateEventAndCreateReservations(userId, reservationData,reservationDetails,totalPrice,totalQuantity) {
	try{console.log("totalQuantity",totalQuantity);
		for (const event of reservationData) {
			    const eventData = await eventModel.findById(event.eventId);
			    if (!eventData) {
			        throw new Error(`Event with ID ${event.eventId} not found`);
			    }
				
			    for (const ticket of event.tickets) {
			        const ticketType = ticket.type;
			        const ticketQuantity = ticket.quantity;
		
			        const eventTicket = eventData.tickets.find(t => t.type === ticketType);
					// console.log("eventTicket",eventTicket);
			        if (!eventTicket || eventTicket.totalTickets < ticketQuantity) {
			            throw new Error(`Not enough tickets available for event ${event.eventId}`);
			        }
		
			        eventTicket.totalTickets -= ticketQuantity;
			        eventTicket.reserved += ticketQuantity;
					await eventData.save();
		}
	}
		const reservation = new reservationModel({
			userId: userId,
			events:reservationDetails,
			totalPrice: totalPrice,
			totalQuantity:totalQuantity,
			timestamp: new Date(),
			isPurchased: false
		});
		console.log("reservation",reservation);
		await reservation.save();
	}
	catch(err){
	console.error(err);

	}

}
function calculateTotalPrice(event, tickets) {
    let totalPrice = 0;

    for (const ticketInfo of tickets) {
        const ticket = event.tickets.find(t => t.type === ticketInfo.type);
		// console.log("ticket",ticket);
        if (!ticket || ticket.totalTickets < ticketInfo.quantity) {
            return -1;
        }
        totalPrice += ticketInfo.quantity * ticket.price;
    }
    return totalPrice;
}
function calculateTotalQuantity(event, tickets) {
    let totalQuantity = 0;

    for (const ticketInfo of tickets) {
        const ticket = event.tickets.find(t => t.type === ticketInfo.type);
		// console.log("ticket",ticket);
        if (!ticket || ticket.totalTickets < ticketInfo.quantity) {
            return -1;
        }
        totalQuantity += ticketInfo.quantity;
    }
    return totalQuantity;
}
let deleteReservation= async (req, res) => {
	const ID = req.params.id;
	let reservation = await reservationModel.findOneAndDelete({ _id: ID });
	if (reservation) {
		res.status(200).json({ message: 'success' });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};

module.exports = {
    updateEventAndCreateReservations,
    calculateTotalPrice,
	getAllReservation,
	getAllReservationByUserId,
	updateReservation,
	calculateTotalQuantity,
	deleteReservation
};
