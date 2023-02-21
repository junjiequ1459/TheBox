const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    roomId:{
      type: Schema.Types.ObjectId,
      ref: "Room"
    },
    winnerId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    players: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
