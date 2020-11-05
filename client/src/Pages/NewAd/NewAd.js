import React, { useContext, useRef, useState } from 'react';
import { addImages } from '../../utils/addImages';
import { BASE_URL } from '../../common/constants'
import './NewAd.css'
import AuthContext from '../../providers/AuthContext';
import { suggestArea } from '../../utils/suggestArea';

const NewAd = () => {

    const [images, setImages] = useState([])
    const [imagesForPreview, setImagesForPreview] = useState([])
    const [suggestedArea, setSuggestedArea] = useState(null)
    const [selectedArea, setSelectedArea] = useState([])
    const [isDeleteButtonForAreasVisible, setIsDeleteButtonForAreasVisible] = useState(null)
    const { user } = useContext(AuthContext)
    const [apartmentInfo, setApartmentInfo] = useState({
        title: '',
        price: 0,
        rooms: 0,
        area: '',
        floor: 0,
        size: 0,
        description: '',
        furnished: '',
        constructionType: '',
        parking: '',
        authorId: user.id,
        images: [],
    })
    const isFurnished = useRef()
    const constructionType = useRef()
    const parking = useRef()
    const areaInput = useRef()

    const uncheckBox = (id, ref) => {
        Array.from(ref.current.children).forEach(child => {
            if (child.localName === 'input') {
                if (child.id !== id && child.checked === true) {
                    child.checked = false
                }
            }
        })
    }


    const updateApartmentInfo = (prop, value, isChecked = true, id, ref = null) => {
        if (isChecked) {
            setApartmentInfo({ ...apartmentInfo, [prop]: value })
        } else {
            setApartmentInfo({ ...apartmentInfo, [prop]: '' })
        }

        ref && uncheckBox(id, ref)

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
                    <div className="area-input-container"
                        onMouseEnter={() => (selectedArea && selectedArea.length > 0) && setIsDeleteButtonForAreasVisible(true)}
                        onMouseLeave={() => setIsDeleteButtonForAreasVisible(false)}>

                        <input ref={areaInput}
                            className="area-input"
                            type="text"
                            value={selectedArea ? selectedArea : areaInput.current.value}
                            placeholder="Area"
                            onBlur={(e) => !(e.relatedTarget && e.relatedTarget.className === "area-suggest-result") && setSuggestedArea(null)}
                            onChange={(e) => e.target.value === '' ? setSuggestedArea(null) : setSuggestedArea(suggestArea(e.target.value))}>

                        </input>
                        {isDeleteButtonForAreasVisible && <span className="area-input-delete-btn" onClick={() => { setSelectedArea(null); areaInput.current.value = ''; setIsDeleteButtonForAreasVisible(false) }}>X</span>}
                    </div>
                    <select className="rooms-input" placeholder="Rooms" onChange={(e) => updateApartmentInfo('rooms', e.target.value)}>
                        <option value="not selected" defaultValue >Rooms</option>
                        <option value="Studio">Studio</option>
                        <option value="One-room">One-room</option>
                        <option value="Two-room">Two-room</option>
                        <option value="Three-room">Three-room</option>
                        <option value="Multi-bedroom">Multi-bedroom</option>
                        <option value="Maisonette">Maisonette</option>
                        <option value="House">House</option>
                        <option value="Storey of a house">Storey of a house</option>
                    </select>

                    <input className="size-input" type="text" placeholder="Size" onChange={(e) => updateApartmentInfo('size', e.target.value)}></input>
                    <input className="floor-input" type="text" placeholder="Floor" onChange={(e) => updateApartmentInfo('floor', e.target.value)}></input>
                    <textarea className="description-input" type="text" placeholder="Description" onChange={(e) => updateApartmentInfo('description', e.target.value)}></textarea>
                    <input className="images-input" type="file" multiple onChange={(e) => { addImages(e, imagesForPreview, setImagesForPreview); (setImages([...images, ...e.target.files])) }}></input>
                    {suggestedArea &&
                        <div tabIndex="1" className="area-suggest-result" onBlur={(e) => !(e.relatedTarget && e.relatedTarget.className === "area-suggest-result") && setSuggestedArea(null)}>
                            {suggestedArea.map(area => {
                                return <p className="suggested-area" onClick={() => selectedArea !== area && (setSelectedArea(area), updateApartmentInfo('area', area))}>{area}</p>
                            })}
                        </div>
                    }

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

                <span className="create-btn" onClick={() => createNewAd()}>Create</span>
            </div>
        </>
    )
}

export default NewAd;