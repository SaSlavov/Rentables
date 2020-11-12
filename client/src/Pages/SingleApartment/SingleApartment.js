import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import SingleApartmentContext from '../../providers/SingleApartmentContext';
import AuthContext from '../../providers/AuthContext.js'
import './SingleApartment.css'
import './SingleApartment-mobile.css'
import { useViewport } from '../../providers/ViewPortContext';

const SingleApartment = () => {
    const [apartment, setApartment] = useState(null)
    const [images, setImages] = useState(null)
    const [headImage, setHeadImg] = useState(null)
    const [isRecommended, setIsRecommended] = useState(null)
    const { apartmentId } = useContext(SingleApartmentContext)
    const { width, height } = useViewport();
    const isMobile = width <= 700 ? true : false
    const {user } = useContext(AuthContext)
 
    const updateClassNames = (className) => {
        return isMobile ? className += '-mobile' : className
    }

    useEffect(() => {
        console.log(apartmentId)
        fetch(`${BASE_URL}/apartments/filter/${apartmentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },

        })
            .then(r => r.json())
            .then(res => {
                console.log(res)
                setApartment(res);
                setIsRecommended(res.isRecommended)
                setImages(res.images.images.split(' '))
                setHeadImg(res.images.images.split(' ')[0])
                // setHeadImg(res.images)
            })
    }, [apartmentId])

    useEffect(() => {
        fetch(`${BASE_URL}/apartments/${apartmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },

        })
            .then(r => r.json())
            .then(res => {
                console.log(res)
            })
    }, [apartmentId])

    const recommendApartment = () => {
        setIsRecommended(!isRecommended)
        fetch(`${BASE_URL}/apartments/recommend/${apartmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },

        })
            .then(r => r.json())
            .then(res => {
                console.log(res)
            })
    }

    return (
        <>
            <div className={updateClassNames("background")} ></div>
            {apartment && <div className={updateClassNames("single-apartment-container")}>
                <div className={updateClassNames("title-and-price")}>
                    <p className="apartment-title">{apartment.title}</p>
                    <p className="apartment-price">{apartment.price} €</p>
                </div>
                <img className={updateClassNames("apartment-headImg")} src={`${BASE_URL}/images/${headImage}`} alt="apartment head"></img>
                {images && images.map((image, index) => {
                    return <img key={index} className="apartment-secondaryImgs" src={`${BASE_URL}/images/${image}`} alt="apartment secondary" onClick={() => setHeadImg(image)}></img>
                })}
                <div className={updateClassNames("apartment-info-container")}>
                    <div className="description-container">
                        <p>Description</p>
                        <p className="description">{apartment.description}</p>
                    </div>
                    <div className="details-container">
                        <p>Details</p>
                        <div className="details-info">
                            <p className="Area"><b>Area:</b> {apartment.area}</p>
                            <p className="construction-type"><b>Construction:</b> {apartment.constructionType}</p>
                            <p className="furnished-bool"><b>Furnished:</b> {apartment.furnished}</p>
                            <p className="floor"><b>Floor:</b> {apartment.floor}</p>
                            <p className="total-size"><b>Total size:</b> {apartment.size}</p>
                            <p className="parking-info"><b>Parking:</b> {apartment.parking}</p>
                        </div>
                        <div>
                            <p id="apartment-id"><b>Id number: </b>{apartment.id}</p>
                        </div>
                        <div>
                            <p className="owner-info"><b>Owner: </b>{apartment.author.firstName} {apartment.author.lastName}</p>
                            <p className="owner-phone"><b>Phone: </b> {apartment.author.phone}</p>
                        </div>
                        {user.role === 'admin' && <span className={isRecommended ? "admin-recommend-apartment-btn-NotRecommend" : "admin-recommend-apartment-btn-recommend"} onClick={() => recommendApartment()}>{isRecommended ? "Not recommended" : 'Recommend'}</span>}
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default SingleApartment;