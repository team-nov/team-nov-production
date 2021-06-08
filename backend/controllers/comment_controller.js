const { default: axios } = require('axios');
const mongoose = require('mongoose');
const Comment = require('../models/comment_model');
//const { getDiscussions } = require('./discussions');

exports.getComments = (req,res,next) => {
    Comment
    .find()   
    .exec()
    .then((data)=>{
        res.status(200).json(data)
    })
}

exports.postCommentForDiscussion = (req,res,next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        // commentId: req.body.commentId,
        userName: req.body.userName,
        userPicture: req.body.userPicture,
        userId: req.body.userId,
        discussionId: mongoose.Types.ObjectId(req.body.discussionId),
        message: req.body.message,
        postTime: new Date(),
    });

    comment
        .save()
        .then((result)=>{
            console.log(result)
            res.status(201).json({
                message_return:"Successfully added comment",
                comment: comment
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
    
}