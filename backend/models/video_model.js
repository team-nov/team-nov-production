const mongoose = require('mongoose');
const Comment = require('./comment_model');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	author: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    title: { type: String, required: true },
	link: { type: String, required: true },
	interests: {type:[String], default:[]},
    comments: { type: [Comment.schema], default: [] }
});


module.exports = mongoose.model('Video', videoSchema);
