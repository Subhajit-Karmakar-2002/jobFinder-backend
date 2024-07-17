const User = require("../models/User");
const cryptojs = require('crypto-js');


const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json("User not found");
        }
        const { password, createdAt, __v, ...others } = updatedUser._doc;
        res.status(200).json({ ...others });
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUser = async (req, res) => {
    try {
        const users = await User.findById(req.user.id);
        const { password, createdAt, updatedAt, __v, ...others } = users._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}


const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { updateUser, deleteUser, getUser, getAllUser }