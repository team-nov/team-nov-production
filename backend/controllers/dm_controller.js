const express =require('express');
const mongoose = require('mongoose');
const {DM,Message} = require('../models/dm_model');

exports.getDms = (req,res,next) => {
    // populate name fields using users table
    DM
        .find()
        .populate('members','name')
        .populate({path:'messages',populate:{path:'from',select:'name picture'}})
        .exec()
        .then((data)=>{
            res.status(200).json(data)
        })
}

exports.getDmById = (req,res,next) => {
    // id extracted from url
    const id = req.params.dmId;
    // populate name fields using users table
    DM
        .findOne({_id:id})
        .populate('members','name')
        .populate({path:'messages',populate:{path:'from',select:'name picture'}})
        .exec()
        .then((data)=>{
            console.log(data)
            res.status(200).json(data)
        })
}

exports.getDmsByUserId = (req,res,next) => {
    const id = req.params.userId;
    // populate fields with props from user model
    DM
        .find({members:id})
        .populate('members')
        .populate({path:'messages',populate:{path:'from',select:'name'}})
        .exec()
        .then((data)=>{
            console.log(data)
            res.status(200).json(data)
        })
}
exports.checkDmExists = async (req,res,next) => {
    try{
        let result = await DM.find({members:{$all:req.body.members}}) 
        if(result.length>0){
            res.status(400).json({
                message:"Dm already exists"
            })
        }
        else{
            res.status(200).json({
                message:"Dm does not exist. Safe to create"
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
}

exports.postDm = async (req,res,next) => {
    let messages
    if(req.body.messages){
        messages = req.body.messages.map((msg)=>{
            return new Message({
                _id: new mongoose.Types.ObjectId(),
                from:msg.from,
                message:msg.message,
                date:Date.now()
            })
        })
    }
    else
        messages=[]
    const dm = new DM({
        _id: new mongoose.Types.ObjectId(),
        members: req.body.members,
        messages: messages,
    });
    // duplicate dm
    try{
        let result = await DM.find({members:{$all:req.body.members}}) 
        if(result.length>0){
            res.status(400).json({
                message:"Dm already exists"
            })
            return;
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }

    try{
        result = await dm.save()
        console.log(result)
        res.status(201).json({
            message:"Successfully added Dm",
            dm: dm
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
}

exports.patchDm = (req,res,next)=>{
    // only used to modify dm props like memebers not messages
    // req.body should have all the updated values
    // like members:[userId1, userId2 ..]

    // extract id from url
    const id = req.params.dmId

    DM
        .updateOne({_id: id},{$set:req.body})
        .exec()
        .then(result=>{
            res.status(200).json({
                message:"Updated dm with id: "+id,
                result:result

            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        });
}

exports.postDmMessage = (req,res,next)=>{
    const id = req.body.dmId;

    const msg = new Message({
        _id: new mongoose.Types.ObjectId(),
        from:req.body.from,
        message:req.body.message,
        date:Date.now()
    })

    const validatedModel = msg.validateSync();
    if (!!validatedModel) {
        res.status(400).json({
            error: validatedModel
        })
        return;
    }

    DM
        .updateOne({_id: id},{$push:{messages:msg}})
        .exec()
        .then(result=>{
            res.status(201).json({
                message:"Added message to dm with id: "+id,
                msg:{
                    _id:msg.id,
                    from:msg.from,
                    message:msg.message,
                    date:msg.date,
                    dmId:id
                }

            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        });

}


exports.deleteDmMessage = (req,res,next)=>{
    const dmId = req.body.dmId;
    const messageId = req.body.messageId

    DM
        .updateOne({_id: dmId},{$pull: {messages: {_id: messageId} }})
        .exec()
        .then(result=>{
            res.status(201).json({
                message:"Deleted message with id "+messageId+" from dm with id: "+dmId,
                itemsModified:result.nModified

            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        });

 }

exports.deleteDm = (req,res,next)=>{
    const id = req.body.dmId;
    DM
        .removeOne({_id:id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message:"Successfully Deleted Dm with id "+id,
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