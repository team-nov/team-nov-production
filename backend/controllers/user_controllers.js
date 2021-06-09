const express =require('express');
const mongoose = require('mongoose');
const User = require('../models/user_model');

// exports.getUsers = (req,res,next) => {
//     User
//         .find()
//         .exec()
//         .then((data)=>{
//             res.status(200).json(data)
//         })
// }

exports.postUsers = (req,res,next) => {
    console.log("GOT HERE!");
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        typeOfUser: req.body.typeOfUser
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