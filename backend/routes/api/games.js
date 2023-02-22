const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const Game = mongoose.model("Game")
const Room = mongoose.model("Room")

//show
router.get('/:id', async(req, res , next) => {
    try {
        const game = await Game.findById(req.params.id).populate("winnerId", "_id username");
        return res.json(game);
    }
    catch(err) {
        const error = new Error('Game not found')
        error.statusCode = 404;
        error.errors = { message: "No game found with that id" };
        return next(error);
    }
})

//index match history
router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const games = await Game.find({ players: { $in: [userId] } }).exec();
    return res.json(games);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


// create
router.post('/', async (req, res, next) => {
    let room;
    try {
        room = await Room.findById(req.params.roomId);
    } catch(err) {
        console.log(req.params.roomId)
        const error = new Error('Room not found');
        error.statusCode = 404;
        error.errors = { message: "No room found with that id"};
        return next(error);
    }

    try {
        console.log(room)
        const newGame = new Game( {
            roomId: req.body.roomId,
            winnerId: req.body.winnerId,
            players: room.players
        })

        let game = await newGame.save();
        game = await game.populate("roomId", "_id name").populate("winnerId", "_id username")
        return res.json(game);
    }
    catch(err) {
        next(err);
    } 
})


module.exports = router;