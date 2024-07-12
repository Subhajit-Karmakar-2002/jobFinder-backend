const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: false },
    isAdmin: { type: Boolean, required: false },
    isAgent: { type: Boolean, required: false },
    skills: { type: Array, required: false },
    profile: {
        type: String,
        required: false,
        default: "https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
    }

},
    {
        timestamps: true,
    });

module.exports = mongoose.model("User", UserSchema);