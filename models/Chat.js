const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, trim: true },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Bookmark", ChatSchema);