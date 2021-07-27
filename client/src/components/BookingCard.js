import React from 'react'
import axios from 'axios';

import styles from './styles.js'

export default function BookingCard(props) {

    const bookingId = props.booking._id;
    const passengers = props.booking.passengers;
    const totalPrice = props.booking.totalPrice;
    const trainName = props.booking.trainName;
    var dot = props.booking.dot;

    dot = dot.split('T')[0];


    const handleClick = (event)=>{

        axios.post('http://localhost:4000/cancelBooking',{bookingId})
        .then(function(response){
            console.log("Responded");
            window.location.reload(false);
            console.log(response);
        })
        .catch(function(err){
            console.log("No response");
            console.log(err);
        });
        
        //alert('Booking Cancelled');
    }

    return (
        <div>
            <div className="card" style={styles.eachcard}>
                <img className="card-img-top" src="..." alt=""/>
                <div className="card-body">
                    {/* <h5 className="card-title">Booking Id : {bookingId}</h5> */}
                    <h5>Train Name: {trainName}</h5>
                    <h5>Date of travel : {dot}</h5>
                    <h5 style={{marginBottom:"0"}}>Passengers :</h5>
                    {   
                        passengers.map((passenger)=>(
                            <li>{passenger.name}</li>
                        ))
                    }
                    <br/>
                    <h5>Total Price : {totalPrice}$</h5>
                    <button className="btn btn-danger" onClick={handleClick}>Cancel Booking</button>
                </div>
            </div>
        </div>
    )
}
