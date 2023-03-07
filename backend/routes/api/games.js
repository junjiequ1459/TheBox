const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Game = mongoose.model("Game");
const User = mongoose.model("User");

//show
router.get("/:roomName", async (req, res, next) => {
  try {
    const game = await Game.findOne({ roomName: req.params.roomName })
      .sort({ timestamp: -1 })
      .limit(1);
    return res.json(game);
  } catch (err) {
    return next(error);
  }
});

module.exports = router;

// create
router.post("/", async (req, res, next) => {
  try {
    let newGame = new Game({
      roomName: req.body.roomName,
      winnerId: req.body.winnerId,
      players: req.body.players,
    });
    

    const winner = await User.findById(req.body.winnerId);
    if (winner) {
      newGame = await newGame.populate("winnerId", "_id username")
      winner.wins += 1;
      winner.losses -= 1;
      await winner.save();

      req.body.players.forEach(async (player) => {
        const loser = await User.findById(player._id);
        loser.losses += 1;
        await loser.save();
      });
    }
    const game = await newGame.save();
    
    return res.json(game);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
