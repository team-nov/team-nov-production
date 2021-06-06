const express = require('express');
const mongoose = require('mongoose');
const Discussion = require('../models/discussion.model');

exports.getDiscussions = (req,res,next) => {
    Discussion
        .find()
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.postDiscussions = (req,res,next) => {
    const discussion = new Discussion({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        userPicture: req.body.userPicture,
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