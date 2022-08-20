const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (request, response) => {
    response.redirect('/')
})

module.exports = router;