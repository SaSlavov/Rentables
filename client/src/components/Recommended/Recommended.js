import React from 'react';
import { useViewport } from '../../providers/ViewPortContext';
import { data } from '../../TempData/data';
import './Recommended.css'

const Recommended = () => {
    const { width, height } = useViewport();
    const isMobile = width <= 700 ? true : false

    const updateClassNames = (className) => {
        return isMobile? className += '-mobile' : className
    }

    return (
        <div className={updateClassNames("recommended-container")}>
            {data.filter(apartment => apartment.recommended).map(apartment => {
                return <div
                className="apartment"
                key={apartment.id}>
                    <img className="recommended-apt-headImg" src={apartment.headImg} alt="apartment"></img>
                    <p>{apartment.title}</p>
                    <p>{apartment.rooms} rooms</p>
                    <p>{apartment.price}</p>
                </div>
            })}
        </div>
    )
}

export default Recommended