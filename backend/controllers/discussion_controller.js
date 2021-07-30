const express = require('express');
const mongoose = require('mongoose');
const Discussion = require('../models/discussion_model');
const Comment = require('../models/comment_model');

exports.getDiscussions = (req,res,next) => {
    console.log("Getting all discussions");
    Discussion
        .find()
        .populate('userId')
        .populate('comments.userId')
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
        .populate('userId')
        .populate('comments.userId')
        .exec()
        .then((data)=>{
            console.log(data)
            res.status(200).json(data)
        })
}

exports.patchDiscussion = (req, res, next) => {

    toUpdate = Discussion.findById(req.body.discussionId).exec().then((data)=>{
        if (data == null) {
            res.status(404).json({
                message_return: "No such discussion."
            });
        }

        else if (req.body.userId == data.userId) {

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
    console.log(req.body.discussionId);

    toDelete = Discussion.findById(req.body.discussionId).exec().then((data)=>{

        console.log("Data userId: " + data.userId);
        console.log("Body userId: " + req.body.userId);


        if (data == null) {
            res.status(404).json({
                message_return: "No such discussion."
            });
        }

        else if (req.body.userId == data.userId) {
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
        userId: new mongoose.Types.ObjectId(req.body.userId),
        imageURL: req.body.imageURL,
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

exports.postComment = async (req, res, next) => {
    const discussionId = req.params.discussionId;

    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(req.body.userId),
        message: req.body.message,
        postTime: new Date(),
    })
    try {
        const data = await Discussion.findByIdAndUpdate(discussionId, {$push: {comments: comment}}, {runValidators: true, new: true})
        res.status(201).json({
            message: "Added comment to discussion",
            comments: data.comments
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

exports.deleteComment = async (req, res, next) => {
    const discussionId = req.params.discussionId;
    const commentId = req.body.commentId;

    try {
        const data = await Discussion.findByIdAndUpdate(discussionId, {$pull: {comments: {_id: commentId} }}, {runValidators: true, new: true})
        res.status(200).json({
            message: "Deleted message with id " + commentId + " from discussion with id: " + discussionId,
            itemsModified: data.nModified
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}

exports.patchComment = async (req, res, next) => {
    const discussionId = req.params.discussionId;
    const commentId = req.body.commentId;
    const commentMsg = req.body.message;

    try {
        const data = await Discussion.findOneAndUpdate({_id: discussionId, "comments._id": commentId}, {$set: {"comments.$.message": commentMsg}}, {runValidators: true, new: true})
        res.status(200).json({
            message: "Updated comment with id: " + commentId,
            itemsModified: data.nModified
        })
    } catch (e) {
        res.status(500).json({
            error: e
        })
    }
}