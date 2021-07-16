const mongoose = require('mongoose');

const interestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }
});


module.exports = mongoose.model('Interest', interestSchema);
