const mongoose = require("mongoose");
const mainSchema = new mongoose.Schema({
    title:{

    },
    description:{

    },
    video:{

    },
    link:{

    }
})

const mainModel = mongoose.model("mains",mainSchema);
module.exports = mainModel;