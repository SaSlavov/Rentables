import React from 'react';
import { data } from '../../TempData/data';
import './Recommended.css'

const Recommended = () => {
    return (
        <div className="recommended-container">
            {data.filter(apartment => apartment.recommended).map(apartment => {
                return <div
                className="apartment"
                key={apartment.id}>
                    <img className="recommended-apt-headImg" src={apartment.headImg} alt="apartment"></img>
                    <p>{apartment.title}</p>
                    <p>{apartment.rooms} rooms</p>
                    <p>{apartment.price}</p>
                </div>
            })}
        </div>
    )
}

export default Recommended