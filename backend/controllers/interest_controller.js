const express =require('express');
const mongoose = require('mongoose');
const Interest = require('../models/interest_model');

exports.getInterests = (req,res,next) => {
    Interest.find()
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.postInterests = (req,res,next) => {
    const interest = new Interest({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });

    interest.save()
        .then((result)=>{
            console.log(result)
            res.status(201).json({
                message:"Successfully added interest",
                success: true,
                interest: interest
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
}