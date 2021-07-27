import React from 'react'
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import styles from './styles.js';


import BookingCard from './BookingCard'

export default function MyBookings() {

    const url = 'http://localhost:4000/mybookings/'+window.sessionStorage.getItem("useremail");;  
    const [res,setRes] = useState(null);

    useEffect( () => {
        axios.get(url,{withCredentials: true})
        .then((response) =>{
            console.log(response);
            setRes(response);
        })
    },[]);

    return (
        <>
        <nav id="userNavbar" className="navbar navbar-light bg-light" style={{marginLeft:"20px"}}>
        <Link id="furnitureHomeButton" className="navbar-brand" to="/">
        <span style={{ fontSize: 20, color: "grey" }}>
            <i class="fas fa-train"></i>{" "}
            <span className="navbar-brand mb-0 h1" style={{ color: "#B1BD5D" }}>
            book my trip
            </span>
        </span>
        </Link>

        <span>
        
        
        <Link id="furnitureOrderButton" className="navbar-brand" to="/user/mybookings">
            <span style={{ fontSize: 20, color: "grey" }}>
            <i class="fas fa-ticket-alt"></i>
            </span>{" "}
            <p style={{ display: "inline", color: "#B1BD5D" }}>My Bookings</p>
        </Link>

        <span style={{ fontSize: 20, color: "grey" }}>
            <i class="fas fa-sign-out-alt"></i>
        </span>
        <Link className="navbar-brand" to="/logout" style={{ fontSize: 20, color: "#B1BD5D" }}> &nbsp;Logout</Link>
        </span>
        </nav>
        <div style={styles.card}>
            {
            res && res.data.map((booking)=>(
                <BookingCard booking={booking}/>
            ))
            }
        </div>
        </>
    )
}
