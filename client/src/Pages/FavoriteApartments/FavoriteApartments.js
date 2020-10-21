import React from 'react';
import { profile } from '../../TempData/profile';
import './FavoriteApartments.css'

const FavoriteApartments = () => {



    return (
        <>
            <div className="background" ></div>
            <div className="favorite-apartments-container">
                <div className="favorites-result">
                    {profile.favoriteApartments.map(apartment => {
                        return <div className="apartment-container" key={apartment.id}>
                            <div className="apartment-info">
                                <p className="favorite-apartment-title">{apartment.title}</p>
                                <img className="favorite-apt-headImg" src={apartment.headImg} alt="Favorite apartment"></img>
                                <div className="favorite-apartment-info">
                                    <p className="favorite-apartment-price">€ {apartment.price}</p>
                                    <p className="favorite-apartment-area">{apartment.area}</p>
                                    <p className="favorite-apartment-rooms">{apartment.rooms} rooms</p>
                                </div>
                            </div>
                            <div className="comments-container">
                                <p>Comments</p>
                                <textarea className="comments"></textarea>
                            </div>
                            <div className="viewing-arrangement">
                                <p>Arrangement for viewing</p>
                                <input type="date" value="1995-11-20"></input>
                                <input type="time"></input>
                                <input type="text" placeholder="Street"></input>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>

    )
}

export default FavoriteApartments;