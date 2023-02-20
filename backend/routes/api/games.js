const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const passport = require("passport")
const { requireUser } = require("../../config/passport")
const Game = mongoose.model("Game")

router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/games"
  });
});

router.get("/:gameId", requireUser ,(req, res, next) => {
    Game.find({ gameId: req.params.gameId }, (err, games) => {
        if (err) {
            const error = new Error("Game is not found")
            error.statusCode = 404
            error.errors = { message: "No game is found with this ID"}
            return next(error);
        }
        if (games.length === 0) {
            const error = new Error("Game is not found")
            error.statusCode = 404
            error.errors = { message: "No game is found with this ID"}
            return next(error);
        }
        res.json(games[0])
    })
})


router.post("/", requireUser, async (req, res, next) => {
    try {
        const newGame = new Game({
            gameId: req.body.gameId
        })

        const game = await newGame.save()
        return res.json(game)
    } catch(err) {
        next(err)
    }
})

module.exports = router;