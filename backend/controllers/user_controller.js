const express =require('express');
const mongoose = require('mongoose');
const User = require('../models/user_model');
const bcrypt = require('bcryptjs');

exports.getUsers = (req,res,next) => {
    User.find()
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.userLogin = (req, res, next) => {
    let username = req.params.username
    console.log(username);
    User.findOne({username:username})
        .exec()
        .then((data)=>{
            bcrypt.compare(req.params.password, data.password, function(err, isMatch) {
                if(err) {
                    res.status(200).json({"success": false})
                }
                if(isMatch) {
                    console.log("Password Matched");
                    res.status(200).json({"_id": data._id,"name": data.name, "typeOfUser":data.typeOfUser, "success": true});
                } else {
                    console.log("Password Did Not Match");
                    res.status(200).json({"success": false})
                }
            });
        })
}

exports.getUserById = (req,res,next) => {
    let id = req.params.userId
    User
        .findOne({_id:id})
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.postUsers = (req,res,next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        picture: req.body.picture,
        username: req.body.username,
        password: req.body.password,
        typeOfUser: req.body.typeOfUser
    });

    user.save()
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