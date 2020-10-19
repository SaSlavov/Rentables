import React, { useState } from 'react';
import {data} from '../../TempData/data'
import './SingleApartment.css'

const SingleApartment = ({ apartmentId }) => {
    const apartment = data.filter(apartment => apartment.id === apartmentId)[0]
    const [headImg, setHeadImg] = useState(apartment.headImg)


    return (
        <div className="single-apartment">
            <p className="apartment-title">{apartment.title}</p>
            <p className="apartment-price">{apartment.price}</p>
            <img className="apartment-headImg" src={headImg} alt="apartment head"></img>
            <img className="apartment-secondaryImgs" src="https://imot.focus.bg/photosimotbg/2/966/big/2c160266117138966_ci.jpg" alt="apartment secondary" onClick={(e) => setHeadImg(e.target.src)}></img>
            <img className="apartment-secondaryImgs" src={'https://imot.focus.bg/photosimotbg/2/774/big/2c160155846911774_zx.jpg'} alt="apartment secondary" onClick={(e) => setHeadImg(e.target.src)}></img>
            <img className="apartment-secondaryImgs" src={'https://imot.focus.bg/photosimotbg/2/795/big/2c160275339054795_Zq.jpg'} alt="apartment secondary" onClick={(e) => setHeadImg(e.target.src)}></img>
            <img className="apartment-secondaryImgs" src={apartment.headImg} alt="apartment secondary" onClick={(e) => setHeadImg(e.target.src)}></img>
            <p></p>
        </div>
    )
}

export default SingleApartment;