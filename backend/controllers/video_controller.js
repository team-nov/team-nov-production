const express = require('express');
const mongoose = require('mongoose');
const Video = require('../models/video_model');
const Comment = require('../models/comment_model');

exports.getVideos = (req,res,next) => {
    Video
        .find()   
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.getVideoById = (req,res,next) => {
    const videoId = req.params.videoId
    Video
        .findOne({_id:videoId})
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

exports.postCommentsByVideoId = (req,res,next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        userPicture: req.body.userPicture,
        message: req.body.message,
        userId: req.body.userId,
        postTime: new Date(),
    })

    const videoId = req.params.videoId;

    Video
        .findOne({_id:videoId})
        .exec()
        .then((video) => {
            video.comments.push(comment)
            video
                .save()
                .then( (result) => {
                    console.log(result)
                    res.status(201).json({
                        message_return:"Successfully added comment to video",
                        video: video
                    })
                })
                .catch( (err) => {
                    console.log(err);
                    res.status(500).json({
                        error:err
                    })
                });
        })
        .catch( (err) => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
}
