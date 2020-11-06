import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import SingleApartmentContext from '../../providers/SingleApartmentContext';
import { useViewport } from '../../providers/ViewPortContext';
import './FavoriteApartments.css'
import './FavoriteApartments-mobile.css'

const FavoriteApartments = () => {
    const { user } = useContext(AuthContext)
    const [apartments, setApartments] = useState(null)
    const { apartmentId } = useContext(SingleApartmentContext)
    const { width, height } = useViewport();
    const isMobile = width <= 700 ? true : false

    const [apartmentInfo, setApartmentInfo] = useState({
        userId: user.id,
        apartmentId: '',
        comment: '',
        street: '',
        date: undefined,
        time: undefined,
        id: undefined,
    })

    const updateClassNames = (className) => {
        return isMobile? className += '-mobile' : className
    }

    const updateApartmentInfo = (prop, value, apartmentId) => {
        setApartmentInfo({
            ...apartmentInfo,
            [prop]: value,
            apartmentId,
        })
    }

    

    const postApartmentInfo = async (apartmentId) => {
        const apartment = apartments.filter(apartment => apartment.apartmentInfo.id === apartmentId)[0]
        const props = Object.keys(apartmentInfo)
        const info = {}

        props.forEach(prop => {
            if (!apartmentInfo[prop]) {
                if (apartment.userInfo[prop]) {
                    info.id = apartment.userInfo.id
                }
                info[prop] = apartment.userInfo[prop]
            } else {
                info[prop] = apartmentInfo[prop]
            }
        })

        fetch(`${BASE_URL}/apartments/favorite/info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
            body: JSON.stringify({ ...info, apartmentId: apartmentId, })
        })
            .then(r => r.json())
            .then(res => {
                console.log(res)
            })
    }

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
                setApartments(res);
            })
    }, [user.id])

    return (
        <>
            <div className="background" ></div>
            <div className={updateClassNames("favorite-apartments-container")}>
                <div className={updateClassNames("favorites-result")}>
                    {apartments && apartments.map(apartment => {
                        return <div className={updateClassNames("apartment-container")} key={apartment.apartmentInfo.id}>
                            <div className={updateClassNames("apartment-info")}>
                                <p className="favorite-apartment-title">{apartment.apartmentInfo.title}</p>
                                <img className="favorite-apt-headImg" src={`${BASE_URL}/images/${apartment.apartmentInfo.images.images.split(' ')[0]}`} alt="Favorite apartment"></img>
                                <div className="favorite-apartment-info">
                                    <p className="favorite-apartment-price">€ {apartment.apartmentInfo.price}</p>
                                    <p className="favorite-apartment-area">{apartment.apartmentInfo.area}</p>
                                    <p className="favorite-apartment-rooms">{apartment.apartmentInfo.rooms} rooms</p>
                                </div>
                            </div>
                            <div className="comments-container">
                                <p>Comments</p>
                                <textarea className="comments" value={apartmentInfo.apartmentId === apartment.apartmentInfo.id && apartmentInfo.comment ? apartmentInfo.comment : apartment.userInfo.comment} onChange={(e) => { updateApartmentInfo('comment', e.target.value, apartment.apartmentInfo.id) }}></textarea>
                            </div>
                            <div className="viewing-arrangement">
                                <p>Arrangement for viewing</p>
                                <input type="date" value={apartmentInfo.apartmentId === apartment.apartmentInfo.id && apartmentInfo.date ? apartmentInfo.date : apartment.userInfo.date} onChange={(e) => updateApartmentInfo('date', e.target.value, apartment.apartmentInfo.id)}></input>
                                <input type="time" value={apartmentInfo.apartmentId === apartment.apartmentInfo.id && apartmentInfo.time ? apartmentInfo.time : apartment.userInfo.time} onChange={(e) => updateApartmentInfo('time', e.target.value, apartment.apartmentInfo.id)}></input>
                                <input type="text" value={apartmentInfo.apartmentId === apartment.apartmentInfo.id && apartmentInfo.street ? apartmentInfo.street : apartment.userInfo.street} placeholder="Street" onChange={(e) => updateApartmentInfo('street', e.target.value, apartment.apartmentInfo.id)}></input>
                                <span className="update-btn" onClick={() => postApartmentInfo(apartment.apartmentInfo.id)}>Update</span>                        </div>
                        </div>
                    })}
                </div>
            </div>
        </>

    )
}

export default FavoriteApartments;