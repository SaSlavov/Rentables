import React, { useState } from 'react';
import { data } from '../../TempData/data'
import './SingleApartment.css'

const SingleApartment = ({ apartmentId }) => {
    const apartment = data.filter(apartment => apartment.id === apartmentId)[0]
    const [headImg, setHeadImg] = useState(apartment.headImg)

    return (
        <div className="single-apartment-container">
            <div className="title-and-price">
                <p className="apartment-title">{apartment.title}</p>
                <p className="apartment-price">€ {apartment.price}</p>
            </div>
            <img className="apartment-headImg" src={headImg} alt="apartment head"></img>
            <img className="apartment-secondaryImgs" src="https://imot.focus.bg/photosimotbg/2/966/big/2c160266117138966_ci.jpg" alt="apartment secondary" onClick={(e) => setHeadImg(e.target.src)}></img>
            <img className="apartment-secondaryImgs" src={'https://imot.focus.bg/photosimotbg/2/774/big/2c160155846911774_zx.jpg'} alt="apartment secondary" onClick={(e) => setHeadImg(e.target.src)}></img>
            <img className="apartment-secondaryImgs" src={'https://imot.focus.bg/photosimotbg/2/795/big/2c160275339054795_Zq.jpg'} alt="apartment secondary" onClick={(e) => setHeadImg(e.target.src)}></img>
            <img className="apartment-secondaryImgs" src={apartment.headImg} alt="apartment secondary" onClick={(e) => setHeadImg(e.target.src)}></img>
            <div className="apartment-info-container">
                <div className="description-container">
                    <p>Description</p>
                    <p className="description">Quis ut commodo elit incididunt anim elit consectetur magna adipisicing laborum mollit occaecat. Irure consectetur consectetur excepteur cillum labore proident commodo ad dolore aliqua nulla ut amet irure. Lorem adipisicing consectetur ipsum voluptate labore est incididunt amet exercitation ipsum mollit id minim. In ad dolor Lorem consectetur duis ea id. Proident et ipsum ut dolor anim irure cupidatat qui. Commodo veniam eu Lorem ad ullamco.</p>
                </div>
                <div className="details-container">
                    <p>Details</p>
                    <div className="details-info">
                        <p className="construction-type"><b>Construction:</b> {apartment.constructionType}</p>
                        <p className="furnished-bool"><b>Furnished:</b> {apartment.furnished ? 'Yes' : 'No'}</p>
                        <p className="floor"><b>Floor:</b> {apartment.floor}</p>
                        <p className="total-size"><b>Total size:</b> {apartment.size}</p>
                        <p className="heating"><b>Heating:</b> {apartment.heating}</p>
                        <p className="parking"><b>Parking:</b> {apartment.parking}</p>
                    </div>
                    <div>
                        <p>Id number</p>
                        <b>{apartment.id}</b>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleApartment;