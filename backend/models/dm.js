const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    message:{type:String, required:true}
})
exports.Message =mongoose.model('Message',messageSchema)

const dmSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    members:[{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}],
    messages:{type:[messageSchema]}
});

exports.DM = mongoose.model('DM',dmSchema);