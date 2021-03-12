import * as mongoose from 'mongoose';


const carsShema = new mongoose.Schema({
    UUID: {
        type: Number
    },
    VIN: {
        type: String
    },
    Make: {
        type: String
    },
    Model: {
        type: String
    },
    Mileage: {
        type: String
    },
    Year: {
        type: String
    },
    Price: {
        type: Number,
    },
    "Zip Code": {
        type: Number
    },
    'Create Date': {
        type: Date,
        required: true,
        default: Date.now()
    },
    'Update Date': {
        type: Date,
        required: true,
        default: Date.now()
    },
    provider: {
        type: String,
        trim: true
    }
})

const Cars = mongoose.model('Cars', carsShema);

export { Cars };