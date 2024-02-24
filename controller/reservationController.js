const eventModel = require('../models/eventModel');
const reservationModel = require('../models/reservationTicket');
async function reserveTickets(userId, eventData, ticketsreq) {
	try {
		const totalPrice = calculateTotalPrice(eventData, ticketsreq);
		//credit card payment if credit card returns true
		await updateEventAndCreateReservations(userId, eventData, ticketsreq);
		//else message credit card has no credit
		return { message: 'success', totalPrice: totalPrice };
	} catch (err) {
		return { message: 'fail' };
	}
}
function calculateTotalPrice(event, ticketsreq) {
	let totalPrice = 0;
	for (const ticketInfo of ticketsreq) {
		const ticket = event.tickets.find(t => t.type === ticketInfo.type);
		if (!ticket || ticket.totalTickets < ticketInfo.quantity) {
			return -1;
		}
		totalPrice += ticketInfo.quantity * ticket.price;
	}
	return totalPrice;
}
async function updateEventAndCreateReservations(userId, eventData, ticketsreq) {
	for (const ticketInfo of ticketsreq) {
		const ticket = eventData.tickets.find(t => t.type === ticketInfo.type);
		ticket.totalTickets -= ticketInfo.quantity;
		ticket.reserved += ticketInfo.quantity;
	}
	await eventData.save();
	for (const ticketInfo of ticketsreq) {
		const ticket = eventData.tickets.find(t => t.type === ticketInfo.type);

		const reservation = new reservationModel({
			userId: userId,
			eventId: eventData._id,
			quantity: ticketInfo.quantity,
			totalPrice: ticketInfo.quantity * ticket.price,
		});
		console.log(reservation);
		await reservation.save();
	}
}

module.exports = {
	reserveTickets,
};
