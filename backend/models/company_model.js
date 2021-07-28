const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    company:{type:String, required:true}, // company/startup the user is affiliated with
    companyLogo:{type:String, required:true},
    companyLocation:{type:String, required:true},
    companyDescription:{type:String, required:true}, // information about the users company (what does the company do?)
    founder: {type:String, required:true}
});

module.exports = mongoose.model('Company', companySchema);
