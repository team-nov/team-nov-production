const express = require('express');
const mongoose = require('mongoose');
const Discussion = require('../models/discussions');

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
        name: req.body.name,
        picture: req.body.picture,
        message: req.body.message,
        postTime: new Date(Date.now)
    });

    user
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