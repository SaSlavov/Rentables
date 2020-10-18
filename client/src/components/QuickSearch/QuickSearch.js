import React from 'react';
import './QuickSearch.css'

const QuickSearch = () => {
    return (
        <div className="quickSearch-container">
            <h3>Search</h3>
            <div className="search-options">
                {/* <label className="area-label">Area</label> */}
                <input className="area" placeholder="Area"></input>
                {/* <label className="rooms-label">Rooms</label> */}
                <input className="rooms" placeholder="Rooms"></input>
                {/* <label className="price-min-label">Min.price</label> */}
                <input className="price-min" placeholder="Min.price"></input>
                {/* <label className="price-max-label">Max.price</label> */}
                <input className="price-max" placeholder="Max.price"></input>
            </div>
            <button className="search-btn">Filter</button>
        </div>
    )
}

export default QuickSearch;