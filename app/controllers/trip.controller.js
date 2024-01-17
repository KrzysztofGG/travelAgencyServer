const Trip = require('../models/trip.model');
const { StatusCodes } = require('http-status-codes')

const getAllTrips = async (req, res) => {
    const trips = await Trip.find()

    res.status(StatusCodes.OK).json({ trips })
}

const getTrip = async (req, res) =>{
    const trip = await Trip.findOne({
        _id: req.params.id
    })
    if(!trip) {
        // throw new NotFoundError(`No job with id ${trip._id}`)
        res.status(StatusCodes.NOT_FOUND).send({ message: `No trip with id ${_id}`})
        return;
    }
    res.status(StatusCodes.OK).json({ trip })
}

const createTrip = async (req, res) => {
    const trip = await Trip.create(req.body)

    res.status(StatusCodes.CREATED).json({ trip })
}

const updateTrip = async (req, res) => {
    const {
        body: { name, country, dateStart, dateEnd,
            price, maxPlaces, availablePlaces, description,
            imageSources, ratings, reviews},
        params: { id: tripId },
    } = req


    if (!name || !country || !dateStart || !dateEnd || !price || !maxPlaces || !availablePlaces || !description || !imageSources || !ratings || !reviews) {
        // throw new BadRequestError('All fields are required');
        res.status(StatusCodes.BAD_REQUEST).send({ message: 'All fields are required'});
        return;
    }

    const trip = await Trip.findByIdAndUpdate(
        { _id: tripId},
        req.body,
        {new: true, runValidators: true}
    )

    if (!trip) {
        // throw new NotFoundError(`No trip with id ${tripId}`);
        res.status(StatusCodes.NOT_FOUND).send({ message: `No trip with id ${tripId}`})
        return;
    }
    res.status(StatusCodes.OK).json({ trip })
}

const deleteTrip = async (req, res) => {
    const {
        params: {id: tripId}
    } = req

    const trip = await Trip.findByIdAndRemove({
        _id: tripId,
    })

    if (!trip) {
        res.status(StatusCodes.NOT_FOUND).send({ message: `No trip with id ${_id}`})
        return;
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllTrips,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip
}