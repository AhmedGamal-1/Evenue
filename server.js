const express = require('express');
const app = express();
const PORT = process.env.PORT || 7005;
var cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
//#region  mw
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//#endregion
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);
const eventRoutes = require('./routes/eventRoute');
app.use('/events', eventRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Handle POST requests to '/api/upload'
// app.post('/api/upload', upload.single('image'), (req, res) => {
// 	try {
// 	  if (!req.file) {
// 		return res.status(400).json({ message: 'No file uploaded' });
// 	  }
  
// 	  // Access the uploaded image data using req.file.buffer
// 	  const imageBuffer = req.file.buffer;
  
// 	  // Generate a unique filename
// 	  const filename = Date.now() + '-' + req.file.originalname;
// 	  const basePath =  "E:/ITI/Evenue/Back/Evenue"
// 	  // Define the path where you want to save the image
// 	  const filePath = path.join(basePath, 'uploads', filename);
  
// 	  // Write the buffer to the file
// 	  fs.writeFile(filePath, imageBuffer, (err) => {
// 		if (err) {
// 		  return res.status(500).json({ message: 'Error saving the file' });
// 		}
		
		
// 		res.json({ message: 'Image uploaded and saved successfully' });
// 	  });
// 	} catch (err) {
// 	  console.log(err);
// 	  res.status(500).json({ message: 'Internal server error' });
// 	}
//   });

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
