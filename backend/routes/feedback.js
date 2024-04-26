const express = require("express");
const Router = express.Router();
const feedbackModel = require("../models/feedbackModel");

Router.route("/").post(async (req, res) => {
  const { feedback } = req?.body;
  if (!feedback) return res.status(400).json({ Alert: "Feedback REQUIRED" });

  try {
    const newFeedback = await feedbackModel.create(req.body);

    return res.status(201).json({ Alert: `${feedback} Added` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Error: err.message });
  }
});

module.exports = Router;
