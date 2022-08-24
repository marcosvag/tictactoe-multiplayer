const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Room = require('../models/Room')

router.get('/:id', ensureAuth, async (request, response) => {
    try {   
        if (mongoose.Types.ObjectId.isValid(request.params.id)) {
            let room = await Room.findById(request.params.id).lean();
            if (room) {
                const players = room.players;
                if(players.indexOf(request.user.id) < 0) {
                    players.push(request.user.id)
                    await Room.findOneAndUpdate(
                        { _id: request.params.id },
                        {players: players},
                        { new: true, runValidators: true }
                      );
                }
                console.log(request.user.id)
                response.render('game', {room: request.params.id, user: request.user.id, players: room.players});
            } else {
                response.status(404).render('errors/404');
            }
        } else {
            response.status(404).render('errors/404');
        }
    } catch (error) {
        console.error(error);
        response.status(500).render('errors/500');
    }
})


module.exports = router;