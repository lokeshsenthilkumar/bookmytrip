import React from 'react';
import AddTrain from './AddTrain.js';
import Trains from './Trains';

export default function Admin() {
    const email = window.sessionStorage.getItem("useremail");
    return (
        <div>
            {email=="admin@gmail.com" ? <Trains who="admin"/> : <h1>Unauthorized</h1>}
        </div>
    )
}
