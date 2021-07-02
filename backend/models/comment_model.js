const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, required:true},
    userName:{type:String, required:true},
    picture:{type:String, required:true},
    message:{type:String, required:true},
    postTime: {type: String, required: true},
});

module.exports = mongoose.model('Comment', commentSchema);
