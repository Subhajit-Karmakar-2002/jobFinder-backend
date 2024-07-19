const Job = require("../models/Job");
const cryptojs = require('crypto-js');


const createJob = async (req, res) => {
    const job = new Job(req.body);
    job.agentId=req.user.id;
    try {
        const saveJob = await job.save();
        const { __v, createdAt, updatedAt, ...info } = saveJob._doc;
        res.status(201).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        console.log(job);
        const { __v, createdAt, updatedAt, ...info } = job._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json(error);
    }
}


const getAllJob = async (req, res) => {
    try {
        const job = await Job.find();
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json(error);
    }
}
const searchJob = async (req, res) => {
    try {
        const job = await Job.aggregate(
            [
                {
                    $search: {
                        index: "jobsearch",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]
        );


        res.status(200).json(job);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { createJob, updateJob, getJob, getAllJob, deleteJob, searchJob }