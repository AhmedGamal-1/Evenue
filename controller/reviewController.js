const eventModel = require('../models/eventModel');
const reviewModel = require("../models/reviewModel")


exports.setReview = (req,res)=>{
  try {
     let eventId = req.params.id;
     let feedBackForm = req.body;
     let review = new reviewModel({
      comment:feedBackForm.comment,
      rating:feedBackForm.rating
     })

     review.save().then((data)=>{
      console.log(data);
       res.status(200).json({message:"suceess", data: data });
     })

	}
	catch (err) {
		console.log(err);
		res.status(404).json({ message: 'fail' });
	}

}
