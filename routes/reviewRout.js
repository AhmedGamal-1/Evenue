const express = require('express');
const router = express.Router();
const reviewController = require("../controller/reviewController");

router.route("/reveiw/:id")
.post(reviewController.setReview);

module.exports=router