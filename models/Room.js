const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    created: {
        type: Date,
        default: Date.now,
    } 
})

module.exports = mongoose.model('Room', RoomSchema)