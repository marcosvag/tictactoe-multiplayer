const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Room = require("../models/Room");

// login

router.get("/", ensureGuest, (request, response) => {
  try {
    response.render("login");
  } catch (error) {
    console.error(error);
    response.status(500).render('errors/500');
  }
});

// create game

router.post("/", ensureAuth, async (request, response) => {
  try {
    await Room.create({ user: request.user.id});
    console.log("RECEIVED");
    const room = await Room.find({ user: request.user.id });
    response.redirect(`/game/${room[room.length - 1]._id}`);
  } catch (error) {
    console.error(error);
    response.status(500).render('errors/500');
  }
});

module.exports = router;
