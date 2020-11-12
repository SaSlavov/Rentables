import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../common/constants'
import AuthContext from '../../providers/AuthContext'
import SingleApartmentContext from '../../providers/SingleApartmentContext'
import { useViewport } from '../../providers/ViewPortContext'
import './MyAds.css'

const MyAds = (props) => {

    const { user } = useContext(AuthContext)
    const { setApartmentId } = useContext(SingleApartmentContext)
    const [apartments, setApartments] = useState(null)
    const { width } = useViewport();
    const isMobile = width <= 700 ? true : false
    const history = props.history

    const updateClassNames = (className) => {
        return isMobile ? className += '-mobile' : className
    }

    const clickApartment = (apartmentId) => {
        setApartmentId({apartmentId});
        localStorage.setItem('apartmentId', apartmentId)
        history.push('/apartment');
    }

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
        <>
            <div className={updateClassNames("my-ads-container")}>
            {apartments && apartments.map(apartment => {
                        return <div
                            className="apartment"
                            key={apartment.id}>

                            <img className="recommended-apt-headImg" src={`${BASE_URL}/images/${apartment.images.images.split(' ')[0]}`} alt="apartment"></img>

                            <p onClick={() => clickApartment(apartment.id)}>{apartment.title}</p>
                            <p>{apartment.rooms} rooms</p>
                            <p>{apartment.price}</p>
                        </div>
                    })}
            </div>
            
        </>
    )
}

export default MyAds;