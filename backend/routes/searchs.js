const express = require("express");
const Router = express.Router();
const mainModel = require("../models/mainModel");

Router.route("/").post(async (req, res) => {
  const { search } = req?.body;
  try {
    const data = await mainModel.aggregate([{ $match: search }]);
    if (data && data.length) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json(data);
    }
  } catch (err) {
    console.error(err);
    return res.status(505).json({ Error: err.message });
  }
});

module.exports = Router;
