const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema(
  {
    userFeedback: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const feedbackModel = mongoose.model("feedbacks", feedbackSchema);
module.exports = feedbackModel;
