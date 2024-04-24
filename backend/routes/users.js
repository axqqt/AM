const express = require("express");
const Router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

Router.route("/register")
  .post(async (req, res) => {
    const { gmail } = req?.body; 
    if ((!gmail))
      return res.status(400).json({ Alert: "Gmail required" });

    try{
        const gmailExists = await userModel.findOne({ gmail });
        if (!gmailExists) {
        //   const hashPWD = bcrypt.hashSync(password, Math.random());
          const newCompany = await userModel.create({ gmail });
            if(newCompany){
                return res.status(201).json({Alert:`${gmail} added`})
            }else{
                return res.status(400).json({Alert:"Error!"})
            }
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({Alert:err.message})
    }
  })
 
  Router.route("/login").post(async (req,res)=>{
    const { gmail,password } = req?.body;
    if ((!gmail || !password))
      return res.status(400).json({ Alert: "Username AND Password required" });

    try{
        const gmailExists = await userModel.findOne({ gmail });
        if(gmailExists.password === password){
            return res.status(200).json({Alert:`${gmail} Logged in!`})
        }else{
            return res.status(401).json({Alert:"Wrong password"})
        }
        
    }catch(err){
        console.error(err);
        return res.status(500).json({Alert:err.message})
    }
  })

  module.exports = Router;