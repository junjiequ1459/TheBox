const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Room = mongoose.model("Room");
const { requireUser } = require("../../config/passport");
const validateRoomInput = require("../../validations/rooms");

//show
router.get("/:id", async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate(
      "host",
      "_id username"
    );
    console.log(room.players);
    return res.json(room);
  } catch (err) {
    const error = new Error("Room not found");
    error.statusCode = 404;
    error.errors = { message: "No room found with that id" };
    return next(error);
  }
});

//index
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("host", "_id username")
      .sort({ createdAt: -1 });
    return res.json(rooms);
  } catch (err) {
    return res.json([]);
  }
});

//create
router.post("/", requireUser, validateRoomInput, async (req, res, next) => {
  try {
    const newRoom = new Room({
      name: req.body.name,
      size: req.body.size,
      host: req.user._id,
    });

    const existingRoom = await Room.findOne({ host: newRoom.host });
    if (existingRoom) {
      const err = new Error("A host can only have one room");
      err.statusCode = 400;
      throw err;
    }

    newRoom.players.push({playerId: req.user._id, username: req.user.username});
    let room = await newRoom.save();
    room = await room.populate("host", "_id username");
    return res.json(room);
  } catch (err) {
    next(err);
  }
});

//update
router.patch("/:id", requireUser, validateRoomInput, async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const roomToUpdate = await Room.findById(roomId);
    if (!roomToUpdate) {
      return res.status(404).json({ message: "Room not found'" });
    }
    const playerinfo = { playerId: req.user._id, username: req.user.username };
    // Check if the player is already in the room
    const playerIndex = roomToUpdate.players.findIndex(
      (player) => player.playerId === req.body.id
    );
    if (playerIndex === -1 && roomToUpdate.players.length < roomToUpdate.size) {
      // If the player is not already in the room and the room has space
      roomToUpdate.players.push(playerinfo);
      await roomToUpdate.save();
    }
    // Populate the updated room object with host information and return it
    const updatedRoom = await Room.findById(roomId).populate(
      "host",
      "_id username"
    );
    return res.json(updatedRoom);
  } catch (err) {
    next(err);
  }
});


//destroy
router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const roomToDelete = await Room.findById(roomId);

    if (!roomToDelete) {
      return res.status(404).json({ message: "Room not found" });
    }

    if(roomToDelete.host._id !== req.user._id){
      return res.status(401).json({message: "Unnauthorized" })
    }

    await roomToDelete.remove();

    return res.json({ message: "Deleted room successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
