const mongoose = require("mongoose");
const mainSchema = new mongoose.Schema({
    title:{
        type:String,
        min:5,trim:true,max:20
    },
    description:{
        type:String,
        min:5,trim:true,max:20
    },
    video:{
        type:String,
        min:5,trim:true,max:20
    },
    link:{
        type:String,
        min:5,trim:true,max:20
    },
    category:{
        type:String,
        default:"default",
        min:5,trim:true,max:20
    },
    commission:{
        type:String,
        default:"default",
        min:5,trim:true,max:20
    }
})

const mainModel = mongoose.model("mains",mainSchema);
module.exports = mainModel;