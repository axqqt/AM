const mongoose = require("mongoose");
const mainSchema = new mongoose.Schema({
    
})

const mainModel = mongoose.model("mains",mainSchema);
module.exports = mainModel;