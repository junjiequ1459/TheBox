const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    size: {
      type: Number,
      min: 2,
      max: 4,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timesstamps: true,
  }
);

module.exports = mongoose.model('Room', roomSchema);