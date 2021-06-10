const express = require('express');
const mongoose = require('mongoose');
const Video = require('../models/video_model');
const Comment = require('../models/comment_model');

exports.getVideos = (req, res, next) => {
    Video
        .find()   
        .exec()
        .then(data => {
            res.status(200).json(data)
        })
}

exports.postVideo = (req, res, next) => {
    const video = new Video({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title
    });

    video
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message_return:"Successfully added video",
                video: video
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
}

exports.deleteVideo = (req, res, next) => {
    const videoId = req.body.videoId;

    Video
        .deleteOne({_id: videoId})
        .exec()
        .then(result =>{
            res.status(200).json({
                message:"Successfully deleted video with id " + videoId,
                itemsModified :result.deletedCount
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
}

exports.patchVideo = (req, res, next)=>{
    const videoId = req.body.videoId;

    Video
        .updateOne({_id: videoId}, {$set: {title: req.body.title}})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Updated title of video with id: " + videoId,
                itemsModified: result.nModified
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.getVideoById = (req, res, next) => {
    const videoId = req.params.videoId
    Video
        .findOne({_id: videoId})
        .exec()
        .then(data => {
            res.status(200).json(data)
        })
}

exports.postComment = (req, res, next) => {
    const videoId = req.params.videoId;
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        userPicture: req.body.userPicture,
        message: req.body.message,
        userId: req.body.userId,
        postTime: new Date(),
    })

    const validatedModel = comment.validateSync();
    if (!!validatedModel) {
        res.status(400).json({
            error: validatedModel
        })
        return;
    }

    Video
        .updateOne({_id: videoId},{$push: {comments: comment}})
        .exec()
        .then(result => {
            res.status(201).json({
                message: "Added comment to video",
                comment: comment
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.deleteComment = (req, res, next) => {
    const videoId = req.params.videoId;
    const commentId = req.body.commentId;

    Video
        .updateOne({_id: videoId}, {$pull: {comments: {_id: commentId} }})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Deleted message with id " + commentId + " from video with id: " + videoId,
                itemsModified: result.nModified
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.patchComment = (req, res, next)=>{
    const videoId = req.params.videoId;
    const commentId = req.body.commentId;

    Video
        .updateOne({_id: videoId, "comments._id": commentId}, {$set: {"comments.$.message": req.body.message}})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Updated comment with id: " + commentId,
                itemsModified: result.nModified
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}