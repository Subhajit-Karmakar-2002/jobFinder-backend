const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");
const { create } = require("../models/User");


const getAllMessage = async (req, res) => {
    try {
        const pageSize = 12;
        const page = req.query.page || 1;

        const skipMessage = (page - 1) * pageSize;

        let messages = await Message.find({ chat: req.params.id }).
            populate("sender", "username profile email")
            .populate('chat')
            .sort({ createdAt: -1 })
            .skip(skipMessage)
            .limit(pageSize);


        messages = await User.populate(messages, {
            path: "chat.users",
            selct: "username profile email"
        });

        res.json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could Not retrieve messages" });
    }
}

const sendMessage = async (req, res) => {
    const { content, chatId, receiver } = req.body;
    if (!content || !chatId) {
        console.log("Invalid Data");
        return res.status(400).json("Invalid Data");
    }

    var newMessage = {
        sender: req.user.id,
        content: content,
        receiver: receiver,
        chat: chatId
    }
    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "username profile email");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            selct: "username profile email"
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
        return res.json(message);
    } catch (error) {
        res.status(400).json({ error: error })
    }
}





module.exports = { sendMessage, getAllMessage }