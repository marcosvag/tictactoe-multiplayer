const express = require('express');
const passport = require('passport-google-oauth20');
const session = require('express-session');
const hbs = require('express-handlebars');
const dotenv = require('dotenv').config();
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const connectMongo = require('connect-mongo');
const http = require('http');
const PORT = process.env.PORT || 333;



const app = express();

app.use(express.static('public'))

const server = http.createServer(app)
const io = new Server(server)

app.get('/', (request, responde) => {
    responde.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('choice', (msg) => {
        io.emit('choice', msg)
        console.log(msg)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(PORT)