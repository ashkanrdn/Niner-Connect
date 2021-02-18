const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rsvp: {
        type: Schema.Types.ObjectId,
        ref: 'Rsvp'
    },
    conTopic: { type: String, required: true },
    conTitle: { type: String, required: true },
    conHost: { type: String, required: true },
    conDetails: { type: String, required: true },
    conLocation: { type: String, required: true },
    conDate: { type: String, required: true },
    conStart: { type: String, required: true },
    conEnd: { type: String, required: true },
    conImgURL: {
        type: String,
        default: 'https://www.signalconnect.com/wp-content/uploads/2018/02/DIRECTV-for-Fast-Food-Restaurants.jpg'
    }

});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;