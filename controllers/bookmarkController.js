const Bookmark = require("../models/Bookmark");


const createBookmark = async (req, res) => {
    const bookmark = new Bookmark(req.body);
    try {
        const saved = await bookmark.save();
        if (!saved) {
            return res.status(404).json({ message: "Creation failed" });
        }
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteBookmark = async (req, res) => {
    try {
        await Bookmark.findByIdAndDelete(req.params.id);
        res.status(200).json("Bookmark deleted Success");
    } catch (error) {
        res.status(500).json(error);
    }
}

const getBookmarks = async (req, res) => {
    try {
        const result = await Bookmark.find({ userId: req.params.userId });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { createBookmark, deleteBookmark, getBookmarks }