import React, { useContext } from 'react';
import SearchResultContext from '../../providers/SearchResultContext';

const SearchResult = () => {
    const {data} = useContext(SearchResultContext)
    const searchResult = typeof data === 'string' ? JSON.parse(data): data

    return (
        <div className="search-result-container">
            <h1>Result</h1>
            {searchResult.map(apartment => {
                return <div
                    className="recommended-apt"
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

export default SearchResult;