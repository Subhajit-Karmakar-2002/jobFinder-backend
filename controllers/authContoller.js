const User = require('../models/User');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
}


const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong credentials");

        const hashedPassword = cryptojs.AES.decrypt(user.password, process.env.PASS_SEC);
        const OriginalPassword = hashedPassword.toString(cryptojs.enc.Utf8);
        OriginalPassword !== req.body.password && res.status(401).json("Wrong credentials");


        const { password, __v, createdAt, ...others } = user._doc;
        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
                isAgent: user.isAgent,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SEC,
            { expiresIn: "21d" }
        );
        res.status(200).json({ ...others, token });
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = { createUser, loginUser }