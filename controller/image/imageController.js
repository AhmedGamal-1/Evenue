const imageModel = require("../../models/imageController.js/image");

exports.addImage=(req,res,next)=>{
  let img=req;
  console.log(img);
  res.json({body:req,file:req.file})
  // let newImage = new imageModel()
}