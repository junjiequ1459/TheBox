const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Room = require('../models/Room')
const bcrypt = require('bcryptjs');
const users = [];
const rooms = [];

users.push(
  new User ({
    username: 'zaus',
    email: 'zaus@zaus.zaus',
    hashedPassword: bcrypt.hashSync('zausbaus', 10)
  })
)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
    insertRoomSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log("Resetting db and seeding users...");

  User.collection.drop()
                 .then(() => User.insertMany(users))
                 .then(() => {
                   console.log("Done!");
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}

const insertRoomSeeds = () => {
  console.log("Resetting db and seeding users...");
  Room.collection.drop()
                 .then(() => Room.insertMany(rooms))
                 .then(() => {
                   console.log("Done!");
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}
