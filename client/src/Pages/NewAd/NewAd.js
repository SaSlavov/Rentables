import React, { useState } from 'react';
import { addImages } from '../../utils/addImages';
import { BASE_URL} from '../../common/constants'
import './NewAd.css'

const NewAd = () => {

    const [images, setImages] = useState([])
    const [apartmentInfo, setApartmentInfo] = useState({
        title: '',
        price: 0,
        rooms: 0,
        area: '',
    })

    const updateApartmentInfo = (prop, value) => {
        setApartmentInfo({...apartmentInfo, [prop]: value})
    }

    const createNewAd = () => {
        fetch(`${BASE_URL}/apartments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
            body: JSON.stringify(apartmentInfo),
        })
            .then(r => r.json())
            .then(res => {
                console.log(res)
            })
    }

    const previewImages = () => {
        return images.map((image, index) => {
            return <img className="uploaded-image" key={index} src={image.result} alt="apartment"></img>
        })
    }

    return (
        <>
            <div className="background" ></div>
            <div className="new-ad-container">
                <input className="title-input" type="text" placeholder="Title" onChange={(e) => updateApartmentInfo('title', e.target.value)}></input>
                <input className="price-input" type="text" placeholder="Price" onChange={(e) => updateApartmentInfo('price', e.target.value)}></input>
                <input className="area-input" type="text" placeholder="Area" onChange={(e) => updateApartmentInfo('area', e.target.value)}></input>
                <input className="rooms-input" type="text" placeholder="rooms" onChange={(e) => updateApartmentInfo('rooms', e.target.value)}></input>
                <textarea className="description-input" type="text" placeholder="Description"></textarea>
                <input className="images-input" type="file" multiple onChange={(e) => addImages(e, images, setImages)}></input>
                <div className="images-output">
                    {previewImages()}
                </div>
                <button onClick={() => createNewAd()}>Create</button>
            </div>
        </>
    )
}

export default NewAd;