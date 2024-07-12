const Job = require("../models/Job");
const cryptojs = require('crypto-js');


const createJob = async (req, res) => {
    const job = new Job(req.body);
    try {
        const saveJob = await job.save();
        const { __v, createdAt, updatedAt, ...info } = saveJob._dov;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateJob = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}
const deleteJob = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

const getJob = async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        const { password, createdAt, updatedAt, __v, ...others } = users._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}


const getAllJob = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { createJob, updateJob, getJob, getAllJob, deleteJob }