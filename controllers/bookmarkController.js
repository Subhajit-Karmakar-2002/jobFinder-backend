const Bookmark = require("../models/Bookmark");
const Job = require("../models/Job");
const User = require("../models/User");


const createBookmark = async (req, res) => {
    const jobid = req.body.job;
    try {
        const job = await Job.findById(jobid);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const newBookmark = await Bookmark({
            job: job,
            userId: req.user.id
        });
        await newBookmark.save();
        res.status(201).json(newBookmark);
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