import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import SingleApartmentContext from '../../providers/SingleApartmentContext';
import { useViewport } from '../../providers/ViewPortContext';
import './Recommended.css'

const Recommended = ({ history }) => {
    const { width} = useViewport();
    const isMobile = width <= 700 ? true : false
    const [recommended, setRecommended] = useState(null)
    const { setApartmentId } = useContext(SingleApartmentContext);


    const updateClassNames = (className) => {
        return isMobile ? className += '-mobile' : className
    }


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
                if (result.error) {
                    console.log(result.message)
                }

                setRecommended(result)
            })
            .catch(alert);
    }, [])

    return (
        <div className={updateClassNames("recommended-container")}>
            {recommended && recommended.map(apartment => {
                return <div
                    className="apartment"
                    key={apartment.id}>
                    <img className="recommended-apt-headImg" src={`${BASE_URL}/images/${apartment.images.images.split(' ')[0]}`} alt="apartment"></img>
                    <p className="single-apartment-title" onClick={() => { setApartmentId({ apartmentId: apartment.id }); history.push('/apartment') }}><b>{apartment.area}</b>, {apartment.title}</p>
                    <p className="single-apartment-rooms">{apartment.rooms} rooms</p>
                    <p className="single-apartment-price">{apartment.price} €</p>
                </div>
            })}
        </div>
    )
}

export default withRouter(Recommended);