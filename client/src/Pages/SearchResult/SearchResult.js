import React, { useContext } from 'react';
import SearchResultContext from '../../providers/SearchResultContext';

const SearchResult = () => {
    const { data } = useContext(SearchResultContext)
    console.log(data)
    return (
        <div className="search-result-container">

        </div>
    )
}

export default SearchResult;