import React, { useContext, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import SearchResultContext from '../../providers/SearchResultContext';
import SingleApartment from '../SingleApartment/SingleApartment';
import './SearchResult.css'

const SearchResult = () => {
    const { data } = useContext(SearchResultContext);
    const [isApartmentVisible, setIsApartmentvisible] = useState(false);
    const [clickedApartment, setClickedApartment] = useState(null)
    const searchResult = typeof data === 'string' ? JSON.parse(data) : data;

    const clickOnApartment = (apartmentId) => {
        setIsApartmentvisible(true)
        setClickedApartment(apartmentId)
    }
    const images = JSON.parse(data)
    return (
        <div className="search-result-container">

            <div className="background" ></div>
            {!isApartmentVisible
                ? <div className="search-result">
                    {searchResult.map(apartment => {
                        return <div
                            className="recommended-apt"
                            key={apartment.id}
                            onClick={() => clickOnApartment(apartment.id)}>
                            <img className="recommended-apt-headImg" src={`${BASE_URL}/images/${images[0].images.images.split(' ')[0]}`} alt="apartment"></img>
                            <p>{apartment.title}</p>
                            <p>{apartment.rooms} rooms</p>
                            <p>{apartment.price}</p>
                        </div>
                    })}
                </div>
                : <SingleApartment apartmentId={clickedApartment} />
            }
        </div>
    )
}

export default SearchResult;