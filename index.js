const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const jobRoute = require('./routes/job')
const bookmarkRoute = require('./routes/bookmark')
const messageRoute = require('./routes/message')
const chatRoute = require('./routes/chat')



dotenv.config();
const port = process.env.PORT;

mongoose.connect(process.env.MONGOURL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));


app.use(express.json());
app.use("/api/", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/users", userRoute);
app.use("/api/bookmarks", bookmarkRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


const server = app.listen(port || 5001, () => console.log(`Listening on port ${port}!`))


const io = require('socket.io')(server, {
    pingTimeOut: 60000,
    cors: {
        origin: "https://jobjunction-orio.onrender.com/"
    }
});


io.on("connection", (socket) => {
    console.log("Connected to socket.io");


    socket.on('setup', (userId) => {
        socket.join(userId);
        socket.broadcast.emit('online user', userId);
        console.log(userId);
    })

    socket.on('typing', (room) => {
        console.log("typing");
        console.log("room");
        socket.to(room).emit('typing', room)
    });
    socket.on('stop typing', (room) => {
        console.log("stop typing");
        console.log("room");
        socket.to(room).emit('stop typing', room)
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('user joined:' + room);
    });
    socket.on('new message', (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        var room = chat._id;

        var sender = newMessageReceived.sender;

        if (!sender || sender._id) {
            console.log('Sender not defined');
            return;
        }

        var senderId = sender._id;
        console.log(senderId + "message sender");
        const users = chat.users;
        if (!users) {
            console.log("user not defined");
            return;
        }

        socket.to(room).emit('message received', newMessageReceived);
        socket.to(room).emit('message sent', "New Message");

    })


    socket.off('setup', () => {
        console.log('user offline');
        socket.leave(userId);
    })
})



