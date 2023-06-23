const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  task: { type: String },
  checked: {
    type: Boolean,
    default: false,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
