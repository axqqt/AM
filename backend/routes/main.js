const express = require("express");
const Router = express.Router();
const mainModel = require("../models/mainModel");
const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsto9mmt0",
  api_key: "857482966483428",
  api_secret: "Vry5wv5flNncSsA3t6km4SQcGnM",
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'your_folder_name', // optional, destination folder in the Cloudinary account
//     allowed_formats: ['mp4', 'avi'], // allowed formats for video uploads
//     resource_type: 'video' // type of resource to upload (image, video, raw)
//   }
// });
// const upload = multer({ storage: storage });

Router.route("/")
  .post(async (req, res) => {
    // Check if required fields are provided
    const { title, description, link, category } = req.body;
    if ((!title || !description || !link, !category))
      return res.status(400).json({ Alert: "Required fields not filled" });

    try {
      // Cloudinary will automatically upload the video and provide its URL
      // const videoUrl = req.file.path; // Cloudinary will provide the URL to the uploaded video

      // Create the document in the database
      await mainModel.create({ title, description, link, category });
      return res.status(201).json({ Alert: "Created" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: err });
    }
  })
  .get(async (req, res) => {
    const selectedType = req?.params?.type;
    if (!selectedType) {
      try {
        const data = await mainModel.find();
        if (data && data.length) {
          return res.status(200).json(data);
        } else {
          return res.status(404).json({ Alert: "No results found" });
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ Error: err });
      }
    } else {
      try {
        const data = await mainModel.aggregate([{ $match: { category: selectedType } }]);
        if (data && data.length) {
          return res.status(200).json(data);
        } else {
          return res.status(404).json({ Alert: "No results found" });
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ Error: err });
      }
    }
  });
  
  

module.exports = Router;
