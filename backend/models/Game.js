const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    roomName: {
      type: String,
      require: true,
    },
    winnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    players: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
