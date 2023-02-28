const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Room = require("../models/Room");
const bcrypt = require("bcryptjs");
const Game = require("../models/Game.js");
const users = [];
const rooms = [];

users.push(
  new User({
    username: "zaus",
    email: "zaus@zaus.zaus",
    hashedPassword: bcrypt.hashSync("zausbaus", 10),
  })
);

users.push(
  new User({
    username: "joey",
    email: "joey@joey.joey",
    hashedPassword: bcrypt.hashSync("joeybaus", 10),
  })
);

users.push(
  new User({
    username: "kaiwen",
    email: "kaiwen@kaiwen.kaiwen",
    hashedPassword: bcrypt.hashSync("kaiwenbaus", 10),
  })
);

users.push(
  new User({
    username: "rex",
    email: "rex@rex.rex",
    hashedPassword: bcrypt.hashSync("rexbaus", 10),
  })
);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    insertSeeds();
    insertRoomSeeds();
    insertGameSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log("Resetting db and seeding users...");

  User.collection
    .drop()
    .then(() => User.insertMany(users))
    .then(() => {
      console.log("Done!");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};

const insertRoomSeeds = () => {
  console.log("Resetting db and seeding rooms...");
  Room.collection
    .drop()
    .then(() => Room.insertMany(rooms))
    .then(() => {
      console.log("Done!");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};

const insertGameSeeds = () => {
  console.log("Resetting db and seeding games...")
  Game.collection.drop()
  .then(() => {
    console.log("Done!")
    mongoose.connection.close()
  })
    .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
}

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});