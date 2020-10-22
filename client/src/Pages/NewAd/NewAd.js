import React, { useState } from 'react';
import { addImages } from '../../utils/addImages';
import './NewAd.css'

const NewAd = () => {

    const [images, setImages] = useState([])

    const previewImages = () => {
        return images.map((image, index) => {
            return <img className="uploaded-image" key={index} src={image.result} alt="apartment"></img>
        })
    }

    return (
        <>
            <div className="background" ></div>
            <div className="new-ad-container">
                <input className="title-input" type="text" placeholder="Title"></input>
                <input className="price-input" type="text" placeholder="Price"></input>
                <input className="area-input" type="text" placeholder="Area"></input>
                <input className="rooms-input" type="text" placeholder="rooms"></input>
                <textarea className="description-input" type="text" placeholder="Description"></textarea>
                <input className="images-input" type="file" multiple onChange={(e) => addImages(e, images, setImages)}></input>
                <div className="images-output">
                    {previewImages()}
                </div>
            </div>
        </>
    )
}

export default NewAd;