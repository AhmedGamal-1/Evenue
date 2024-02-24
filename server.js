const express = require('express');
const app = express();
const PORT = process.env.PORT || 7005;
var cors = require('cors');
const mongoose = require('mongoose');
//#region  mw
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//#endregion
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);
const eventRoutes = require('./routes/eventRoute');
app.use('/events', eventRoutes);
//#region
mongoose
	.connect(
		'mongodb+srv://mariammemo445:OgDWtRmtnE89kWxp@cluster0.ubax5lm.mongodb.net/evenue?retryWrites=true&w=majority',
	)
	.then(data => {
		app.listen(PORT, () => {
			console.log('http://localhost:' + PORT);
		});
	})
	.catch(err => {
		console.log(err);
	});
