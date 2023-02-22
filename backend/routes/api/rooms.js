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
router.post("/", validateRoomInput, async (req, res, next) => {
  try {
    const newRoom = new Room({
      name: req.body.name,
      size: req.body.size,
      host: req.body.host,
    });

    const existingRoom = await Room.findOne({ host: newRoom.host });
    if (existingRoom) {
      const err = new Error("A host can only have one room");
      err.statusCode = 400;
      throw err;
    }

    newRoom.players.push(req.body.host);
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
    
    if(!roomToUpdate.includes(req.body.playerId) && roomToUpdate.players.length < roomToUpdate.size){
      roomToUpdate.players.push(req.body.playerId)
      roomToUpdate.save({players: roomToUpdate.players}).then(res.json(roomToUpdate));
    }

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
      return res.status(404).json({ message: "Unauthorized" });
    }

    await roomToDelete.remove();

    return res.json({ message: "Deleted room successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
