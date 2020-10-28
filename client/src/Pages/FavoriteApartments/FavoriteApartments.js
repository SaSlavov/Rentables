import React, { useContext, useEffect, useRef, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import { profile } from '../../TempData/profile';
import './FavoriteApartments.css'

const FavoriteApartments = () => {
    const { user } = useContext(AuthContext)
    const [apartments, setApartments] = useState(null)

    const [apartmentInfo, setApartmentInfo] = useState({
        userId: user.id,
        apartmentId: '',
        comment: '',
        street: '',
        date: undefined,
        time: undefined,
    })

    const comment = useRef(null)

    const updateApartmentInfo = (prop, value, apartmentId) => {
        console.log(value)
        console.log(apartmentId)
        setApartmentInfo({
            ...apartmentInfo,
            [prop]: value,
        })
    }

    const editUserInfo = (userInfo) => {
        if(userInfo) {
            console.log('in user info')
            for (let key in userInfo) {
                console.log(key)
            }
        }
    }

    const postApartmentInfo = (apartmentId) => {
        fetch(`${BASE_URL}/apartments/favorite/info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
            body: JSON.stringify({ ...apartmentInfo, apartmentId: apartmentId })
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

    console.log(apartments)
    console.log(apartmentInfo)
//apartmentInfo.apartmentId === apartment.apartmentInfo.id && apartmentInfo.comment ? apartmentInfo.comment : apartment.apartmentInfo.comment
    return (
        <>
            <div className="background" ></div>
            <div className="favorite-apartments-container">
                <div className="favorites-result">
                    {apartments && apartments.map(apartment => {
                        return <div className="apartment-container" key={apartment.apartmentInfo.id}>
                            <div className="apartment-info">
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
                                <textarea className="comments" value={apartment.userInfo.comment} onChange={(e) => {updateApartmentInfo('comment', e.target.value, apartment.apartmentInfo.id) }}></textarea>
                            </div>
                            <div className="viewing-arrangement">
                                <p>Arrangement for viewing</p>
                                <input type="date" value={apartment.userInfo.date} onChange={(e) => updateApartmentInfo('date', e.target.value)}></input>
                                <input type="time" value={apartment.userInfo.time} onChange={(e) => updateApartmentInfo('time', e.target.value)}></input>
                                <input type="text" value={apartment.userInfo.street} placeholder="Street" onChange={(e) => updateApartmentInfo('street', e.target.value)}></input>
                            </div>
                            <button onClick={() => postApartmentInfo(apartment.apartmentInfo.id)}>Update</button>
                            {/* <button onClick={() => editUserInfo(apartment.id)}>Edit</button> */}
                        </div>
                    })}
                </div>
            </div>
        </>

    )
}

export default FavoriteApartments;