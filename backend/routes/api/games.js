const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const passport = require("passport")
const { requireUser } = require("../../config/passport")
const Game = mongoose.model("Game")

//show
// router.get('/:id')

//create
// router.post('/')


module.exports = router;