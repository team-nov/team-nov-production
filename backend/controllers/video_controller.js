const express = require('express');
const mongoose = require('mongoose');
const Video = require('../models/video_model');
const Comment = require('../models/comment_model');

exports.getVideos = async (req, res, next) => {

    try {
        const data = await Video.find()
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

// search should be a get request
exports.searchVideos = async (req,res,next) =>{
    try{
        console.log("\/"+req.params.query+"\/");
        const myRegex = new RegExp(req.params.query)
        const data = await Video.find({title:{$regex:myRegex}})
        res.status(200).json(data)
    } catch(e){
        res.status(500).json({
            error: e
        })
    }
}

exports.postVideo = async (req, res, next) => {

    const video = new Video({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title
    });

    try {
        await video.save()
        res.status(201).json({
            message: "Successfully added a new video",
            video: video
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

exports.deleteVideo = async (req, res, next) => {

    const videoId = req.body.videoId;

    try {
        const data = await Video.findByIdAndDelete(videoId)
        res.status(200).json({
            message: "Successfully deleted video with id " + videoId,
            itemsModified: data.deletedCount
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

exports.patchVideo =  async (req, res, next) => {

    const videoId = req.body.videoId;
    const titleMsg = req.body.title;

    try {
        const data = await Video.findByIdAndUpdate(videoId, {$set: {title: titleMsg}}, { runValidators: true, new: true})
        res.status(200).json({
            message: "Updated title of video with id: " + videoId,
            itemsModified: data.nModified
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

exports.getVideoById = async (req, res, next) => {

    const videoId = req.params.videoId;

    try {
        const data = await Video.findById(videoId).populate('comments.userId')
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

exports.postComment = async (req, res, next) => {

    const videoId = req.params.videoId;

    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        message: req.body.message,
        postTime: new Date()
    })

    try {
        const data = await Video.findByIdAndUpdate(videoId, {$push: {comments: comment}}, {runValidators: true, new: true}).populate('comments.userId')
        res.status(201).json({
            message: "Added comment to video",
            comments: data.comments
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

exports.deleteComment = async (req, res, next) => {
    
    const videoId = req.params.videoId;
    const commentId = req.body.commentId;

    try {
        const data = await Video.findByIdAndUpdate(videoId, {$pull: {comments: {_id: commentId} }}, {runValidators: true, new: true})
        res.status(200).json({
            message: "Deleted message with id " + commentId + " from video with id: " + videoId,
            itemsModified: data.nModified
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

exports.patchComment = async (req, res, next) => {

    const videoId = req.params.videoId;
    const commentId = req.body.commentId;
    const commentMsg = req.body.message;

    try {
        await Video.findOneAndUpdate({_id: videoId, "comments._id": commentId}, {$set: {"comments.$.message": commentMsg}}, {runValidators: true, new: true})
        await Video.findOneAndUpdate({_id: videoId, "comments._id": commentId}, {$set: {"comments.$.edited": true}}, {runValidators: true, new: true})
        data = await Video.findOneAndUpdate({_id: videoId, "comments._id": commentId}, {$set: {"comments.$.postTime": new Date()}}, {runValidators: true, new: true}).populate('comments.userId')
        res.status(200).json({
            message: "Updated comment with id: " + commentId,
            itemsModified: data.nModified,
            comments: data.comments
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}