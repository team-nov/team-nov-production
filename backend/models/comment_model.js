const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    message:{type: String, required:true},
    postTime: {type: String, required: true},
    edited: {type: Boolean, default: false}
});

module.exports = mongoose.model('Comment', commentSchema);
