const { get } = require('mongoose');
const Chat = require('../models/Chat');
const User = require('../models/User');


const accessChat = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    })

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'username profile email'
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        var chatData = {
            chatName: req.user.id,
            isGroupChat: false,
            users: [req.user.id, userId]
        };

    }

    try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({
            _id: createdChat._id
        }).populate(
            "users", "-password"
        );
        res.status(200).json(FullChat);
    } catch (error) {
        res.status(400).json("Failed to create chat");
    }

}




const getChat = async (req, res) => {
    try {

        let results = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 });


        results = await User.populate(results, {
            path: 'latestMessage.sender',
            select: 'username profile email'
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Error retrieving chat:', error);
        res.status(500).json({ error: "Failed to retrieve chat" });
    }
};


module.exports = { accessChat, getChat }