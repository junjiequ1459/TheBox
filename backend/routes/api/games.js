const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const passport = require("passport")
const Game = mongoose.model("Game")

router.get('/', async(req, res, next) => {
    res.json({
        message: "GET /api/games"
    })
})

router.get("/:gameId", async (req, res, nex) => {
    let game
    try {
        game = await Game.findById(req.params.gameId)
    } catch(err) {
        const error = new Error("Game is not found")
        error.statusCode = 404
        error.errors = { message: "No game is found with this ID"}
    }
})

router.post("/", async (req, res, next) => {
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