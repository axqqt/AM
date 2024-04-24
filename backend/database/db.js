const mongoose = require("mongoose");
require("dotenv").config();



async function connection(){
    try{
        await mongoose.connect(process.env.CLUSTER,{useNewUrlParser:true});
        console.log("Connected to DB")
    }catch(err){
        console.error(err);
    }
}

module.exports = connection;