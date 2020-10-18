import React from 'react';
import QuickSearch from '../../components/QuickSearch/QuickSearch';
import './Homepage.css'

const Homepage = () => {
    return (
        <div className="homepage-container">
            <img className="varna-image" src="https://trud.bg/public/images/articles/2020-07/%D0%B2%D0%B0%D1%80%D0%BD%D0%B022_6175783433033857334_original.jpg"></img>
            <QuickSearch />
            <div className="recommended">asdsa</div>
        </div>
    ) 
}

export default Homepage;