import React, { useContext, useEffect } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import { profile } from '../../TempData/profile';
import './FavoriteApartments.css'

const FavoriteApartments = () => {
    const { user } = useContext(AuthContext)


    useEffect(() => {
        fetch(`${BASE_URL}/apartments/favorite/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },

        })
            .then(r => r.json())
            .then(res => {
                console.log(res)
                // setApartment(res);
                // setImages(res.images.images.split(' '))
                // setHeadImg(res.images.images.split(' ')[0])
                // setHeadImg(res.images)
            })
    }, [user.id])




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