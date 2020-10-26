import React, { useState } from 'react';
import { addImages } from '../../utils/addImages';
import { BASE_URL } from '../../common/constants'
import './NewAd.css'

const NewAd = () => {

    const [images, setImages] = useState([])
    const [imagesForPreview, setImagesForPreview] = useState([])
    const [apartmentInfo, setApartmentInfo] = useState({
        title: '',
        price: 0,
        rooms: 0,
        area: '',
        floor: 0,
        description: '',
        furnished: '',
        constructionType: '',
        parking: '',
        images: [],
    })

    const updateApartmentInfo = (prop, value, isChecked = true) => {
        if (isChecked) {
            setApartmentInfo({ ...apartmentInfo, [prop]: value })
            return
        } else {
            setApartmentInfo({ ...apartmentInfo, [prop]: '' })
            return
        }

    }

    const createNewAd = () => {
        const formData = new FormData();
        formData.append('info', JSON.stringify(apartmentInfo))
        images.forEach(image => formData.append('images[]', image[0]))
        updateApartmentInfo('images', formData)

        fetch(`${BASE_URL}/apartments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
            body: formData //JSON.stringify(apartmentInfo),
        })
            .then(r => r.json())
            .then(res => {
                console.log(res)
            })
    }

    const previewImages = () => {
        return <div className="uploaded-images">
            {imagesForPreview.map((image, index) => {
                return <img className="uploaded-image" key={index} src={image.result} alt="apartment"></img>
            })}

        </div>
    }

    return (
        <>
            <div className="background" ></div>
            <div className="new-ad-container">
                <p className="title">Create a new ad</p>
                <div className="main-info-container">
                    <input className="title-input" type="text" placeholder="Title" onChange={(e) => updateApartmentInfo('title', e.target.value)}></input>
                    <input className="price-input" type="text" placeholder="Price" onChange={(e) => updateApartmentInfo('price', e.target.value)}></input>
                    <input className="area-input" type="text" placeholder="Area" onChange={(e) => updateApartmentInfo('area', e.target.value)}></input>
                    <input className="rooms-input" type="text" placeholder="Rooms" onChange={(e) => updateApartmentInfo('rooms', e.target.value)}></input>
                    <input className="floor-input" type="text" placeholder="Floor" onChange={(e) => updateApartmentInfo('floor', e.target.value)}></input>
                    <textarea className="description-input" type="text" placeholder="Description" onChange={(e) => updateApartmentInfo('description', e.target.value)}></textarea>
                    <input className="images-input" type="file" multiple onChange={(e) => (addImages(e, imagesForPreview, setImagesForPreview), (setImages([...images, e.target.files])))}></input>

                </div>
                <div className="additional-info-container">
                    <div className="additional-info">
                        <div className="is-furnished">
                            <p className="is-furnished-title"> Furnished:</p>
                            <div className="division"></div>
                            <input className="checkbox" type="checkbox" value="furnished" onChange={(e) => updateApartmentInfo('furnished', e.target.value, e.target.checked)}></input>
                            <label>Furnished</label>
                            <input className="checkbox" type="checkbox" value="partially furnished" onChange={(e) => updateApartmentInfo('furnished', e.target.value, e.target.checked)}></input>
                            <label>Partially Furnished</label>
                            <input className="checkbox" type="checkbox" value="not furnished" onChange={(e) => updateApartmentInfo('furnished', e.target.value, e.target.checked)}></input>
                            <label>Not furnished</label>
                            <div className="vertical-division"></div>
                        </div>
                        <div className="construction-type-container">
                            <p className="is-furnished-title"> Construction:</p>
                            <div className="division"></div>
                            <input className="checkbox" type="checkbox" onChange={(e) => updateApartmentInfo('constructionType', e.target.value, e.target.checked)}></input>
                            <label>Brick</label>
                            <input className="checkbox" type="checkbox" onChange={(e) => updateApartmentInfo('constructionType', e.target.value, e.target.checked)}></input>
                            <label>Panel</label>
                            <input className="checkbox" type="checkbox" onChange={(e) => updateApartmentInfo('constructionType', e.target.value, e.target.checked)}></input>
                            <label>EPK</label>
                            <div className="vertical-division"></div>
                        </div>
                        <div className="parking-type">
                            <p className="is-furnished-title"> Parking:</p>
                            <div className="division"></div>
                            <input className="checkbox" type="checkbox" onChange={(e) => updateApartmentInfo('parking', e.target.value, e.target.checked)}></input>
                            <label>No Parking</label>
                            <input className="checkbox" type="checkbox" onChange={(e) => updateApartmentInfo('parking', e.target.value, e.target.checked)}></input>
                            <label>Dedicated spot</label>
                            <input className="checkbox" type="checkbox" onChange={(e) => updateApartmentInfo('parking', e.target.value, e.target.checked)}></input>
                            <label>Garage</label>
                            <div className="vertical-division"></div>
                        </div>
                    </div>
                    <div className="images-output">
                        <p className="images-title-count">Images({imagesForPreview.length === 0 ? '0' : imagesForPreview.length})</p>
                        {imagesForPreview.length > 0 && previewImages()}
                    </div>
                </div>

                <button className="create-btn" onClick={() => createNewAd()}>Create</button>
            </div>
        </>
    )
}

export default NewAd;