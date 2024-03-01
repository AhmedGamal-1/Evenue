const express = require('express');
const app = express();
const PORT = process.env.PORT || 7005;
var cors = require('cors');
const multer = require("multer");
const path = require("path");
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
const reservationRoutes = require('./routes/reservationRoute');
app.use('/reservations', reservationRoutes);


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // console.log("filename storage:", file);
//     cb(null, path.join(__dirname, "images"));
//   },
//   filename: (req, file, cb) => {
//     // console.log("filename storage:", file);
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype == "image/jpg" ||
//     file.mimetype == "image/jpeg" ||
//     file.mimetype == "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };


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

// app.use(multer({ storage: storage}).single("image"));
// // console.log(storage.getDestination());
// // app.use("/images", express.static(path.join(__dirname, "images")));
// app.post('/api/upload', (req, res) => {
//   // Logic to handle the uploaded image and send a response
//   console.log(req.body);
//   res.json({body:req.body });
// });