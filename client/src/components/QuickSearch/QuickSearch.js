import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import SearchResultContext from '../../providers/SearchResultContext';
import { data } from '../../TempData/data';
import './QuickSearch.css';

const QuickSearch = (props) => {
    const [area, setArea] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [priceMin, setPriceMin] = useState(undefined);
    const [priceMax, setPriceMax] = useState(undefined);
    const { setDataState } = useContext(SearchResultContext)

    const filterApartments = (area, rooms, priceMin = 0, priceMax = 0) => {

        function filterByGivenRequirements(apartment) {
            if (
                apartment.area === area &&
                apartment.rooms === Number(rooms) &&
                apartment.price >= priceMin &&
                apartment.price <= priceMax) {

                return true;
            }
        }
        const filteredApartments = data.filter(filterByGivenRequirements);
        localStorage.setItem('searchResult', JSON.stringify(filteredApartments))
        setDataState({data: filteredApartments});
        props.history.push('/apartments');

    }

    return (
        <div className="quickSearch-container">
            <h3>Search</h3>
            <div className="search-options">
                <input className="area" placeholder="Area" onChange={(e) => setArea(e.target.value)}></input>
                <input className="rooms" placeholder="Rooms" onChange={(e) => setRooms(e.target.value)}></input>
                <input className="price-min" placeholder="Min.price" onChange={(e) => setPriceMin(e.target.value)}></input>
                <input className="price-max" placeholder="Max.price" onChange={(e) => setPriceMax(e.target.value)}></input>
            </div>
            <button className="search-btn" onClick={() => filterApartments(area, rooms, priceMin, priceMax)}>Filter</button>
        </div>
    )
}

export default withRouter(QuickSearch);