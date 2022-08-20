const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const ConnectDatabase = require('./config/database');
const MongoStore = require('connect-mongo')
const http = require('http');
const PORT = process.env.PORT || 333;

// ENV config
dotenv.config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

ConnectDatabase();

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);
app.set('layout', 'layouts/layout')

const server = http.createServer(app);

// WebSocket
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('choice', (msg) => {
        io.emit('choice', msg);
        console.log(msg);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

// Sessions
app.use(session({
    secret: 'yesSir',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/game', require('./routes/play'));

server.listen(PORT);