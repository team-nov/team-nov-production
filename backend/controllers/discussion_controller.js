const express = require('express');
const mongoose = require('mongoose');
const Discussion = require('../models/discussion_model');

exports.getDiscussions = (req,res,next) => {
    console.log("Getting all discussions");
    Discussion
        .find()
        .populate('userId')
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.getOneDiscussion = (req, res, next) => {
    console.log("Getting one discussion");
    console.log(req.params.discussionId);

    Discussion
        .findById(req.params.discussionId)
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.patchDiscussion = (req, res, next) => {

    console.log("Discussion ID: " + req);
    toUpdate = Discussion.findById(req.body.discussionId).exec().then((data)=>{

        if (data == null) {
            res.status(404).json({
                message_return: "No such discussion."
            });
        }

        else if (req.body.userId._id === data.userId) {
            Discussion
                .findByIdAndUpdate(req.body.discussionId, { message: req.body.message })
                .exec()
                .then((data)=>{
                    res.status(200).json({
                        message_return: "Successfully updated discussion",
                    })
                })
        }
    
        else if (req.body.userId != data.userId) {
            res.status(401).json({
                message_return: "You do not have permission."
            });
        }
    });

}

exports.deleteDiscussion = (req, res, next) => {

    toDelete = Discussion.findById(req.body.discussionId).exec().then((data)=>{

        console.log(data);

        if (data == null) {
            res.status(404).json({
                message_return: "No such discussion."
            });
        }

        else if (req.body.userId._id === data.userId) {
            Discussion
                .findByIdAndDelete(req.body.discussionId)
                .exec()
                .then((data)=>{
                    res.status(200).json({
                        message_return: "Successfully deleted discussion",
                    })
                })
        }

        else if (req.body.userId != data.userId) {
            res.status(401).json({
                message_return: "You do not have permission."
            });
        }
    });
}

exports.postDiscussions = (req,res,next) => {
    const discussion = new Discussion({
        _id: new mongoose.Types.ObjectId(),
        message: req.body.message,
        userId: req.body.userId,
        postTime: new Date(),
    });

    discussion
        .save()
        .then((result)=>{
            console.log(result)
            res.status(201).json({
                message_return:"Successfully added discussion",
                discussion: discussion
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
}	