const mongoose = require('mongoose')

const TripSchema = new mongoose.Schema(
    {
        // id: Number,
        name: String,
        country: String,
        dateStart: String,
        dateEnd: String,
        price: Number,
        maxPlaces: Number,
        availablePlaces: Number,
        description: String,
        imageSources: {
            type: [String]
        },
        ratings: {
            type: [Number]
        },
        reviews: []
    },
    { timestamps: false,
    versionKey: false }
)

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;