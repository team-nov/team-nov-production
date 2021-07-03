const mongoose = require('mongoose');
const Comment = require('./comment_model');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    comments: { type: [Comment.schema], default: [] }
});


module.exports = mongoose.model('Video', videoSchema);
