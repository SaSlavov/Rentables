import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import './MyAdsStatistics.css'

const MyAdsStatistics = () => {
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
    }, [])


    return (
        <div className="my-ads-statistics">
            <div id="titles">
                <p> Title</p>
                <p >Price €</p>
                <p >Area</p>
                <p >Views</p>
                <p >Favorites</p>
            </div>
            { apartments && apartments.map(apartment => {
                return <div className="my-apartments-stats-container" key={apartment.id}>
                    <p id="apartment-title">{apartment.title}</p>
                    <p id="apartment-price">{apartment.price} €</p>
                    <p id="apartment-area">{apartment.area}</p>
                    <p id="apartment-views">{apartment.views}</p>
                    <p id="apartment-favorites">{apartment.favoriteOf.length}</p>
                </div>
            })}
        </div>
    )
}

export default MyAdsStatistics;