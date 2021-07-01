const mongoose = require('mongoose');

const discussionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, ref:'User', required:true},
    message:{type:String, required:true},
    postTime: {type: String, required: true},
    ownDiscussion:{type: Boolean, default: false},
    comments: {type: Array, default: []}
});

module.exports = mongoose.model('Discussion', discussionSchema);

