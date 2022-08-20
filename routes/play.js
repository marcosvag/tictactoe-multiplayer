const express = require('express');
const router = express.Router();

const Room = require('../models/Room')

router.get('/:id', (request, response) => {
    try {
        
        response.render('game')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})


module.exports = router;