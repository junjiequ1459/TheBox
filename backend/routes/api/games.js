const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Game = mongoose.model("Game");
const User = mongoose.model("User");

//show
router.get("/:id", async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate("winnerId", "_id username")
      .populate("players", "_id username wins losses");
    return res.json(game);
  } catch (err) {
    const error = new Error("Game not found");
    error.statusCode = 404;
    error.errors = { message: "No game found with that id" };
    return next(error);
  }
});

module.exports = router;

// create
router.post("/", async (req, res, next) => {
  try {
    const newGame = new Game({
      roomName: req.body.roomName,
      winnerId: req.body.winnerId,
      players: req.body.players,
    });

    const game = await newGame.save();
    
    const winner = await User.findById(req.body.winnerId);
    if(winner){
      winner.wins += 1;
      winner.losses -= 1;
      await winner.save();
    }

    req.body.players.forEach(async (player) => {
      const loser = await User.findById(player._id);
      loser.losses += 1;
      await loser.save();
    });
    return res.json(game);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
