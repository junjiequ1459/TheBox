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

roomSchema.pre("save", async function (next) {
  const room = this;

  // Check if there is another Room with the same host value
  const existingRoom = await Room.findOne({ host: room.host });
  if (existingRoom && !existingRoom._id.equals(room._id)) {
    const err = new Error("A host can only have one room");
    return next(err);
  }

  return next();
});

module.exports = mongoose.model('Room', roomSchema);