const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      required: true,
      default: "a",
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
