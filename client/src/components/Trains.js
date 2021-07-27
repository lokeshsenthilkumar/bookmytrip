import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import UTrainCard from './UTrainCard';
import ATrainCard from './ATrainCard';
import styles from './styles'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
export default function Trains(props) {

    var who = props.who;

    const q = 10;
    const p = 5;

    const url = 'http://localhost:4000/getTrains';  
    const [res,setRes] = useState(null);
    const [sorted,setSorted] = useState("false");
    const [searchTerm,setSearchTerm] = useState("");
    const [minPrice,setMinPrice] = useState(0);
    const [maxPrice,setMaxPrice] = useState(1000);

    useEffect( () => {
        console.log(minPrice);
        console.log(maxPrice);

        axios.get(url+"\\"+minPrice+"\\"+maxPrice,{withCredentials: true})
        .then((response) =>{
            console.log(response);
            setRes(response);
        })
        .catch((error)=>{
            console.log(error);
        });
    },[minPrice,maxPrice]);

    const handleAddTrain = () => {
      window.location = "/addtrain"
    }

    const handleSort = () => {
      if(sorted=="false" || sorted=="desc"){
        setSorted("asc");
        res.data.sort(function(a, b){
          var keyA = a.trainName,
              keyB = b.trainName;
              
          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
        });
      }else{
        setSorted("desc");
        res.data.sort(function(a, b){
          var keyA = a.trainName,
              keyB = b.trainName;
              
          if(keyA > keyB) return -1;
          if(keyA < keyB) return 1;
          return 0;
        });
      }
      console.log(res.data);
    }

    const handleMinPrice = (e) => {
      console.log(e.target.value);
      setMinPrice(e.target.value);
    }

    const handleMaxPrice = (e) => {
      console.log(e.target.value);
      setMaxPrice(e.target.value);
    }

    return (
        <div>
        <nav id="userNavbar" className="navbar navbar-light bg-light" style={{paddingLeft:"20px"}}>
        <Link id="furnitureHomeButton" className="navbar-brand" to="/">
          <span style={{ fontSize: 20, color: "grey" }}>
            <i class="fas fa-train"></i>{" "}
            <span className="navbar-brand mb-0 h1" style={{ color: "#B1BD5D" }}>
              book my trip
            </span>
          </span>
        </Link>

        <span>
          
          {who == "admin" ?
          <Link id="furnitureOrderButton" className="navbar-brand" to="/admin">
          <span style={{ fontSize: 20, color: "grey" }}>
            <i class="fas fa-subway"></i>
          </span>{" "}
          <p style={{ display: "inline", color: "#B1BD5D" }}>Trains</p>
          </Link>
          :
          <Link id="furnitureOrderButton" className="navbar-brand" to="/user/mybookings">
            <span style={{ fontSize: 20, color: "grey" }}>
              <i class="fas fa-ticket-alt"></i>
            </span>{" "}
            <p style={{ display: "inline", color: "#B1BD5D" }}>My Bookings</p>
          </Link>
          }

          <span style={{ fontSize: 20, color: "grey" }}>
            <i class="fas fa-sign-out-alt"></i>
          </span>
          <Link className="navbar-brand" to="/logout" style={{ fontSize: 20, color: "#B1BD5D" }}> &nbsp;Logout</Link>
        </span>
      </nav>
        {who === "admin" && 
        <span className="btc" style={{marginTop:"30px"}}>
          <button className="btn btn-primary" onClick={handleAddTrain}>Add Train</button>
        </span>
        }

        <div id="util"> 
          <button id="sortbtn" className="btn shadow-none btn-primary" onClick={handleSort}>Sort</button>
          <input id="searchbar" placeholder="Search trains..." class="form-control" type="text" ></input>
        </div>
        <div id="priceFilter">
          <label for="minPrice">Min Price: &nbsp; </label>
          <input id="minPrice" placeholder="Min price" class="form-control" type="number" onChange={handleMinPrice} value={minPrice}></input>
          <label for="minPrice">Max Price: &nbsp;</label>
          <input id="maxPrice" placeholder="Max price" class="form-control" type="number" onChange={handleMaxPrice} value={maxPrice}></input>
        </div>

        
        
        <div style={styles.card}>
            { 
                res && res.data.map((trains)=>(
                    who==="admin" ? <ATrainCard trains={trains}/> :  <UTrainCard trains={trains}/> 
                ))  
            }
        </div>
        </div>
    )
}
