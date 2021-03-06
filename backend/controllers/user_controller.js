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

exports.searchUsers = async(req,res,next) =>{
    try{
        const myRegex = new RegExp(req.params.query, 'i')
        const data = await User.find({username:{$regex:myRegex}})
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({
            error: e
        })
    }

}

exports.userLogin = (req, res, next) => {
    let username = req.body.username
    console.log(username);
    User.findOne({username:username})
        .exec()
        .then((data)=>{
            if(data != null) {
                // check if the password matches
                bcrypt.compare(req.body.password, data.password, function(err, isMatch) {
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
            } else {
                res.status(200).json({success: false})
            }
        })
}

exports.getUserById = (req,res,next) => {
    let id = req.params.userId
    User
        .findOne({_id:id})
        .exec()
        .then((data)=>{
            console.log(data);
            res.status(200).json(data)
        })
}

exports.updateProfile = (req, res, next) => {
    const id = req.body._id

    var password = req.body.password;
    
    if (password != null) {
        // hash the password before updating
        bcrypt.genSalt(10, function (saltError, salt) {
            if(saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(password, salt, function(hashError, hash) {
                    if(hashError) {
                        return next(hashError)
                    }
                    console.log("hash: " + hash);
                    req.body.password = hash;
                    console.log("req.body.password1: " + req.body.password);
                    console.log(req.body)
                    User
                        .updateOne({_id: id},{$set:req.body})
                        .exec()
                        .then(result=>{
                            res.status(200).json({
                                success: true
                            })
                        })
                        .catch(err=>{
                            res.status(500).json({
                                error:err
                            })
                        });
                })
            }
        })
    } else {
        User
            .updateOne({_id: id},{$set:req.body})
            .exec()
            .then(result=>{
                res.status(200).json({
                    success: true
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            });
    }
}

exports.postUsers = (req,res,next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        picture: req.body.picture,
        username: req.body.username,
        password: req.body.password,
        typeOfUser: req.body.typeOfUser,
    });

    User.findOne({username:req.body.username})
        .exec()
        .then((data)=>{
            if(!data) {
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
            } else {
                res.status(500).json({message:"User already exists!"})
            }
        })
}