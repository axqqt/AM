const express = require("express");
const Router = express.Router();
const mainModel = require("../models/mainModel");

Router.route("/")
  .post(async (req, res) => { //they can add
    const {} = req?.body;

    try{
        await mainModel.create(req.body);
        return res.status(201).json({Alert:"Created"})
    }catch(err){
        console.error(err);
        return res.status(500).json({Error:err})
    }
  })
  .get(async (req, res) => { //anyone can view
    try {
      const data = await mainModel.find();
      if (data && data.length) {
        return res.status(200).json(data);
      } else {
        return res.status(404).json({ Alert: "No results found" });
      }
    } catch (err) {
      console.error(err);
    }
  });
