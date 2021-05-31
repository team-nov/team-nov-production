const express =require('express');
const mongoose = require('mongoose');
const User = require('../models/user');

exports.getUsers = (req,res,next) => {
    User
        .find()
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.postUsers = (req,res,next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        picture: req.body.picture
    });

    user
        .save()
        .then((result)=>{
            console.log(result)
            res.status(201).json({
                message:"Successfully added user",
                user: user
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
}