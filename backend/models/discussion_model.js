const mongoose = require('mongoose');
const Comment = require('./comment_model');

const discussionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    message:{type: String, required:true},
    postTime: {type: String, required: true},
    comments: {type: [Comment.schema], default: []},
    imageURL: {type: String},
    edited: {type: Boolean, default: false}
});

module.exports = mongoose.model('Discussion', discussionSchema);

