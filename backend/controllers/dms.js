const express =require('express');
const mongoose = require('mongoose');
const {DM} = require('../models/dm');
const {Message} = require('../models/dm')

exports.getDms = (req,res,next) => {
    DM
        .find()
        .populate('members','name')
        .populate({path:'messages',populate:{path:'from',select:'name'}})
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.getDmsById = (req,res,next) => {
    let id = req.params.dmId;
    DM
        .findOne({_id:id})
        .populate('members','name')
        .populate({path:'messages',populate:{path:'from',select:'name'}})
        .exec()
        .then((data)=>{
            console.log(data)
            res.status(200).json(data)
        })
}

exports.postDms = (req,res,next) => {
    const messages = req.body.messages.map((msg)=>{
        return new Message({
            _id: new mongoose.Types.ObjectId(),
            from:msg.from,
            message:msg.message
        })
    })
    const dm = new DM({
        _id: new mongoose.Types.ObjectId(),
        members: req.body.members,
        messages: messages,
    });

    dm
        .save()
        .then((result)=>{
            console.log(result)
            res.status(201).json({
                message:"Successfully added Dm",
                dm: dm
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
}