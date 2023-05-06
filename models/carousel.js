const mongoose = require('mongoose');

const carouselSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        URL: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const carousel = mongoose.model('Carousel', carouselSchema);

module.exports = carousel;