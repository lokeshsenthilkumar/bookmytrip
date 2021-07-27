import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
    name:{
        type:String
    },
});

const bookingSchema = new mongoose.Schema({
    email:String,
    trainName : String,
    dot:Date,
    totalPrice:Number,
    passengers : [passengerSchema]
});

export default mongoose.model('Booking',bookingSchema);