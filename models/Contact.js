const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image_url: {
        type: String

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Contact', contactSchema);