const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    age: {type:Number,required:true},
    picture:{type:String, default:"s"}
});

module.exports = mongoose.model('User',userSchema);