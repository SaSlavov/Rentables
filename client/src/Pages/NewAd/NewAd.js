import React, { useRef, useState } from 'react';
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
    const isFurnished = useRef()
    const constructionType = useRef()
    const parking = useRef()

    const uncheckBox = (id, ref) => {
        Array.from(ref.current.children).forEach(child => {
            if(child.localName === 'input') {
                if(child.id !== id && child.checked === true) {
                    child.checked = false
                }
            }
        })
    }
    

    const updateApartmentInfo = (prop, value, isChecked = true, id, ref) => {
        if (isChecked) {
            setApartmentInfo({ ...apartmentInfo, [prop]: value })
        } else {
            setApartmentInfo({ ...apartmentInfo, [prop]: '' })
        }

        uncheckBox(id, ref)

    }

    const createNewAd = () => {
        const formData = new FormData();
        formData.append('info', JSON.stringify(apartmentInfo))
        images.forEach(image => formData.append('images[]', image))
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
                    <input className="images-input" type="file" multiple onChange={(e) => {addImages(e, imagesForPreview, setImagesForPreview); (setImages([...images, ...e.target.files]))}}></input>

                </div>
                <div className="additional-info-container">
                    <div className="additional-info">
                        <div ref={isFurnished} className="is-furnished">
                            <p className="is-furnished-title"> Furnished:</p>
                            <div className="division"></div>
                            <input id="furnished" type="checkbox" value="furnished" onChange={(e) => updateApartmentInfo('furnished', e.target.value, e.target.checked, e.target.id, isFurnished)}></input>
                            <label htmlFor="furnished">Furnished</label>
                            <input id="part-furnished" type="checkbox" value="partially furnished" onChange={(e) => updateApartmentInfo('furnished', e.target.value, e.target.checked, e.target.id, isFurnished)}></input>
                            <label htmlFor="part-furnished">Partially Furnished</label>
                            <input id="not-furnished" type="checkbox" value="not furnished" onChange={(e) => updateApartmentInfo('furnished', e.target.value, e.target.checked, e.target.id, isFurnished)}></input>
                            <label htmlFor="not-furnished">Not furnished</label>
                            <div className="vertical-division"></div>
                        </div>
                        <div ref={constructionType} className="construction-type-container">
                            <p className="is-furnished-title"> Construction:</p>
                            <div className="division"></div>
                            <input id="brick" type="checkbox" value="brick" onChange={(e) => updateApartmentInfo('constructionType', e.target.value, e.target.checked, e.target.id, constructionType)}></input>
                            <label htmlFor="brick">Brick</label>
                            <input id="panel" type="checkbox" value="panel" onChange={(e) => updateApartmentInfo('constructionType', e.target.value, e.target.checked, e.target.id, constructionType)}></input>
                            <label htmlFor="panel">Panel</label>
                            <input id="epk" type="checkbox" value="EPK" onChange={(e) => updateApartmentInfo('constructionType', e.target.value, e.target.checked, e.target.id, constructionType)}></input>
                            <label htmlFor="epk">EPK</label>
                            <div className="vertical-division"></div>
                        </div>
                        <div ref={parking} className="parking-type">
                            <p className="is-furnished-title"> Parking:</p>
                            <div className="division"></div>
                            <input id="no-parking" type="checkbox" value="no parking" onChange={(e) => updateApartmentInfo('parking', e.target.value, e.target.checked, e.target.id, parking)}></input>
                            <label htmlFor="no-parking">No Parking</label>
                            <input id="dedicated-spot" type="checkbox" value="dedicated spot" onChange={(e) => updateApartmentInfo('parking', e.target.value, e.target.checked, e.target.id, parking)}></input>
                            <label htmlFor="dedicated-spot">Dedicated spot</label>
                            <input id="garage" type="checkbox" value="garage" onChange={(e) => updateApartmentInfo('parking', e.target.value, e.target.checked, e.target.id, parking)}></input>
                            <label htmlFor="garage">Garage</label>
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