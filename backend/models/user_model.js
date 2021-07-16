const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Interest = require('./interest_model')

// const userSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name:{type:String,required:true},
//     age: {type:Number,required:true},
//     picture:{type:String, default:"s"}
// });

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    picture:{type:String, required:true},
    email:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    aboutMe: {type:String},
    interests: {type:[String], default:[]},
    team:{type:String}, // basically the company/startup the user is affiliated with
    typeOfUser:{type:String,required:true}
});


// Basically the pre method of a schema is run before the save method
userSchema.pre("save", function (next) {
    const user = this

    // First we check whether the password has been modified or if a new password is added
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if(saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(user.password, salt, function(hashError, hash) {
                    if(hashError) {
                        return next(hashError)
                    }

                    user.password = hash;
                    next()
                })
            }
        })
    } else {
        return next();
    }
})

// Authentication of passwords
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) {
            return cb(err);
        } 
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User',userSchema);