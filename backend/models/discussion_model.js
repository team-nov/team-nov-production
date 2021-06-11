const mongoose = require('mongoose');

const discussionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName:{type:String, required:true},
    userPicture:{type:String, required:true},
    userId: {type: String, required:true},
    message:{type:String, required:true},
    postTime: {type: String, required: true},
    comments: {type: Array, default: []}
});

module.exports = mongoose.model('Discussion', discussionSchema);

