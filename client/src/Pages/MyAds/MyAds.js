import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../common/constants'
import AuthContext from '../../providers/AuthContext'
import './MyAds.css'

const MyAds = () => {

    const { user } = useContext(AuthContext)
    const [apartments, setApartments] = useState(null)

    useEffect(() => {
        fetch(`${BASE_URL}/apartments/filter/user/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },

        })
            .then(r => r.json())
            .then(res => {
                console.log(res)
                setApartments(res);
                // setImages(res[0].images.images.split(' '))
                // setHeadImg(res[0].images.images.split(' ')[0])
                // setHeadImg(res.images)
            })
    })


    return (
        <>
            <div className="background" ></div>
            <div className="my-ads-container">
            <div className="favorites-result">
                <p>My ads</p>
                    {apartments && apartments.map(apartment => {
                        return <div className="apartment-container" key={apartment.id}>
                            <div className="apartment-info">
                                <p className="favorite-apartment-title">{apartment.title}</p>
                                <img className="favorite-apt-headImg" src={`${BASE_URL}/images/${apartment.images.images.split(' ')[0]}`} alt="my apartment"></img>
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

export default MyAds;