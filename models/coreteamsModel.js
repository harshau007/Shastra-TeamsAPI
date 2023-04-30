const mongoose = require('mongoose')

const coreteamsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Member name"]
        },
        designation: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required:true
        },
        image: {
            type: String,
            required: true
        },
        linkedin: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const coreMember = mongoose.model('CoreMember', coreteamsSchema);

module.exports = coreMember;