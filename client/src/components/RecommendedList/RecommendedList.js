import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import './RecommendedList.css'
import './RecommendedList-mobile.css'
import SingleApartmentContext from '../../providers/SingleApartmentContext';
import { withRouter } from 'react-router-dom';

const RecommendedList = ({updateClassNamesMobile, history}) => {
    const { user } = useContext(AuthContext);
    const [recommended, setRecommended] = useState(null)
    const { setApartmentId } = useContext(SingleApartmentContext);

    useEffect(() => {
        fetch(`${BASE_URL}/apartments/recommend`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        })
        .then(r => r.json())
        .then(result => {
            console.log(result)
            if (result.error) {
                console.log(result.message)
            }

            setRecommended(result) 
        })
        .catch(alert);
    }, [])

    return (
        <div className={updateClassNamesMobile("recommended-apartments-container")}>
            <div id={updateClassNamesMobile("grid-recommended-titles")}>
                <p> Title</p>
                <p >Area</p>
                <p >Price</p>
            </div>
            {recommended && recommended.map((apartment, index) => {
                return <div className={updateClassNamesMobile("recommended-apartment-info-container")} key={index}>
                    <p className={updateClassNamesMobile("recommended-apartment-title")} onClick={() => { setApartmentId({ apartmentId: apartment.id }); history.push('/apartment') }}>{apartment.title}</p>
                    <p className={updateClassNamesMobile("recommended-apartment-area")}>{apartment.area}</p>
                    <p className={updateClassNamesMobile("recommended-apartment-time")}>{apartment.price}</p>
                </div>
            })}
        </div>
    )
}

export default withRouter(RecommendedList);