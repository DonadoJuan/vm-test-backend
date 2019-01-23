const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {collection: 'user'});

userSchema.methods.setPassword = function(password){
    this.password = crypto.createHash('sha256').update(password).digest('base64');
};


module.exports = mongoose.model('User', userSchema);