const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    event: {
        type: Schema.Types.ObjectId,
        ref: 'Connection'
    },
    going: { type: String, required: true }

});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

module.exports = Rsvp;