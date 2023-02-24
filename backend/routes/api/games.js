const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Game = mongoose.model("Game");
const User = mongoose.model("User");

//show
router.get("/:id", async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id).populate(
      "winnerId",
      "_id username"
    );
    return res.json(game);
  } catch (err) {
    const error = new Error("Game not found");
    error.statusCode = 404;
    error.errors = { message: "No game found with that id" };
    return next(error);
  }
});

//index match history
router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const games = await Game.find({ players: { $in: [userId] } })
      .populate("winnerId", "_id username")
      .exec();
    return res.json(games);
  } catch (err) {
    next(err);
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

    let game = await newGame.save();
    game = await game.populate("winnerId", "_id username");

    const winner = await User.findById(req.body.winnerId);
    winner.wins += 1;
    winner.losses -= 1;
    await winner.save();

    req.body.players.forEach(async (player) => {
      const loser = await User.findById(player.playerId);
      loser.losses += 1;
      await loser.save();
    });
    return res.json(game);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
