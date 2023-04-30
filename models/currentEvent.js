const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        thumbnail: {
            type: String,
            required: true
        },
        eventName: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        mode: {
            type: String
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const event = mongoose.model('Event', eventSchema);

module.exports = event;