const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //commentId: {type: String, required: true},
    userName:{type:String, required:true},
    // userPicture:{type:String, default: "s"},
    // userId: {type: String, default:"nullID"},
    message:{type:String, required:true},
    postTime: {type: String, required: true},
});

module.exports = mongoose.model('Comment', commentSchema);