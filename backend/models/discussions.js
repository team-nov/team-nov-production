const mongoose = require('mongoose');

const discussionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    picture:{type:String, default: "s"},
    message:{type:String, default: "default message"},
});

module.exports = mongoose.model('Discussion', discussionSchema);

