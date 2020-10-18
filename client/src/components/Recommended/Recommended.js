import React from 'react';
import { data } from '../../TempData/data';
import './Recommended.css'

const Recommended = () => {
    return (
        <div className="recommended-container">
            {data.map(apartment => {
                return <div
                className="recommended-apt"
                key={apartment.id}>
                    <img className="recommended-apt-headImg" src={apartment.headImg}></img>
                    <p>{apartment.title}</p>
                    <p>{apartment.rooms} rooms</p>
                    <p>{apartment.price}</p>
                </div>
            })}
        </div>
    )
}

export default Recommended