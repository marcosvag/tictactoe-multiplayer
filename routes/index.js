const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Room = require('../models/Room')


// login

router.get('/', ensureGuest, (request, response) => {
    try {
        response.render('login')
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
})


// create game

router.post('/', ensureAuth, async (request, response) => {
    try {
        await Room.create({user: request.user.id});
        console.log('RECEIVED')
        response.redirect(`/game/${request.user.id}`);
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
})

module.exports = router;