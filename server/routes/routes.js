import express from "express";
const router = express.Router();

import User from '../models/UserModel.js';
import Train from '../models/TrainModel.js';
import Booking from '../models/BookingModel.js';


router.post('/signup', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(data => {
            res.json(data);
            console.log('Data added');
        })
        .catch(error => {
            res.json(error);
            console.log(error);
            console.log('Data not added');
        })
});

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email,password);

    try {
        const user = await User.login(email, password);

        res.status(200).json({
            userId: user._id,
            email : user.email
        });
    } catch (err) {
        console.log(err);
        res.status(200).json({err:true});
    }
});

router.post('/addTrain', (req, res) => {
    const train = new Train(req.body);
    train.save()
        .then(data => {
            console.log(data);
            res.json(data);
            console.log("Train Added");    
        })
        .catch(error => {
            res.json(error);
            console.log(error);
            console.log('Data not added');
        })
});

router.get('/getTrains/:minPrice/:maxPrice', (req, res) => {
    console.log(req.params.minPrice);
    console.log(req.params.maxPrice);
    Train.find({"price":{"$gte":req.params.minPrice , "$lte":req.params.maxPrice}},function (err, foundTrains) {
        var trains = foundTrains;
    })
    .then((data) => {
        res.send(data);
    });
});

router.get('/getTrain/:no', (req, res) => {
    Train.find({trainNo:req.params.no},function (err, foundTrains) {
        var trains = foundTrains;
    })
    .then((data) => {
        res.send(data);
    });
});

router.post('/addBooking', (req, res) => {
    const booking = new Booking(req.body);
    booking.save()
        .then(data => {
            res.json(data);
            console.log("Booking Added");    
        })
        .catch(error => {
            res.json(error);
            console.log(error);
            console.log('Booking not added');
        })
});

router.get('/mybookings/:email', (req, res) => {

    Booking.find({email:req.params.email},function (err, foundTrains) {
        var trains = foundTrains;
    })
    .then((data) => {
        res.send(data);
    });
});

router.post('/cancelBooking', (req, res) => {

    const bid = req.body.bookingId;
    console.log(bid);
    Booking.findByIdAndDelete(bid)
        .then(data => {
            res.json(data);
            console.log('Data deleted');
        })
        .catch(error => {
            res.json(error);
            console.log(error);
            console.log('Data not deleted');
        })
});

router.post('/canceltrain', (req, res) => {

    const tid = req.body.id;
    console.log(tid);
    Train.findByIdAndDelete(tid)
        .then(data => {
            res.json(data);
            console.log('Data deleted');
        })
        .catch(error => {
            res.json(error);
            console.log(error);
            console.log('Data not deleted');
        })
});


export default router;