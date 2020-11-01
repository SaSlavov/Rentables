import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import SearchResultContext from '../../providers/SearchResultContext';
import './QuickSearch.css';

const QuickSearch = (props) => {
    const [area, setArea] = useState(null);
    const [rooms, setRooms] = useState(undefined);
    const [priceMin, setPriceMin] = useState(undefined);
    const [priceMax, setPriceMax] = useState(undefined);
    const { setDataState } = useContext(SearchResultContext)

    const filterApartments = (area, rooms = 0, priceMin = 0, priceMax = 0) => {

        fetch(`${BASE_URL}/apartments/filter?area=${area}&rooms=${rooms}&priceMin=${priceMin}&priceMax=${priceMax}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },

        })
            .then(r => r.json())
            .then(res => {
                localStorage.setItem('searchResult', JSON.stringify(res))
                setDataState({ data: JSON.stringify(res) });
                props.history.push('/apartments');
            })

    }

    return (
        <div className="quickSearch-container">
            <h3>Search</h3>
            <div className="quickSearch-options">
                <input className="quickSearch-area" placeholder="Area" onChange={(e) => setArea(e.target.value)}></input>
                <input className="quickSearch-rooms" placeholder="Rooms" onChange={(e) => setRooms(e.target.value)}></input>
                <input className="quickSearch-price-min" placeholder="Min.price" onChange={(e) => setPriceMin(e.target.value)}></input>
                <input className="quickSearch-price-max" placeholder="Max.price" onChange={(e) => setPriceMax(e.target.value)}></input>
            </div>
            <span className="quickSearch-search-btn" onClick={() => filterApartments(area, rooms, priceMin, priceMax)}>Filter</span>
        </div>
    )
}

export default withRouter(QuickSearch);