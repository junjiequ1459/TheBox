const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    roomName: {
      type: String,
      require: true,
    },
    winner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
