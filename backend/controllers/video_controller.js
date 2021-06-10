const express = require('express');
const mongoose = require('mongoose');
const Video = require('../models/video_model');

exports.getVideos = (req,res,next) => {
    Video
        .find()   
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.postVideos = (req,res,next) => {
    const video = new Video({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title
    });

    video
        .save()
        .then( (result) => {
            console.log(result)
            res.status(201).json({
                message_return:"Successfully added video",
                video: video
            })
        })
        .catch( (err) => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
}