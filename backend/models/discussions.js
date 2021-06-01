const mongoose = require('mongoose');

const discussionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    picture:{type:String, default: "s"},
    message:{type:String, required:true},
    postTime: {type: Date, required: true}
});

module.exports = mongoose.model('Discussion', discussionSchema);

