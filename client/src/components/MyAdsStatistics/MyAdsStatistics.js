import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import './MyAdsStatistics.css'
import './MyAdsStatistics-mobile.css'
import { withRouter } from 'react-router-dom';
import SingleApartmentContext from '../../providers/SingleApartmentContext';

const MyAdsStatistics = ({isMobile, updateClassNamesMobile, history}) => {
    const { user } = useContext(AuthContext)
    const [apartments, setApartments] = useState(null)
    const { setApartmentId } = useContext(SingleApartmentContext);

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
                setApartments(res);
            })
    }, [])


    return (
        <div className={updateClassNamesMobile("my-ads-statistics")}>
            <div id={updateClassNamesMobile("titles")}>
                <p> Title</p>
                <p >Price €</p>
                <p >Area</p>
                <p >Views</p>
                <p >Favorites</p>
            </div>
            { apartments && apartments.map(apartment => {
                return <div className={updateClassNamesMobile("my-apartments-stats-container")} key={apartment.id}>
                    <p id="apartment-title" onClick={() => { setApartmentId({ apartmentId: apartment.id }); history.push('/apartment') }}>{apartment.title}</p>
                    <p id="apartment-price">{apartment.price} €</p>
                    <p id="apartment-area">{apartment.area}</p>
                    <p id="apartment-views">{apartment.views}</p>
                    <p id="apartment-favorites">{apartment.favoriteOf.length}</p>
                </div>
            })}
        </div>
    )
}

export default withRouter(MyAdsStatistics);