import React from 'react';
import QuickSearch from '../../components/QuickSearch/QuickSearch';
import Recommended from '../../components/Recommended/Recommended';
import './Homepage.css'

const Homepage = () => {
    return (
        <div className="homepage-container">
            {/* <img className="varna-image" src="https://trud.bg/public/images/articles/2020-07/%D0%B2%D0%B0%D1%80%D0%BD%D0%B022_6175783433033857334_original.jpg" alt="Varna"></img> */}
            <div className="varna-image"></div>
            <QuickSearch />
            <div className="recommended">
                <Recommended />
            </div>
            <div className="make-them-register">
                <div className="reasons">
                    <h1>Why you should consider making an account:</h1>
                    <p> - You could add apartments to your favorites</p>
                    <p> - There you could write comments about each one</p>
                    <p> - Can add the the day and time of your arrangement to see the apartment</p>
                </div>
                <div className="register-container">
                    <h2>Register</h2>
                    <input className="username-input" type="text" placeholder="username"></input>
                    <input className="username-input" type="password"placeholder="password"></input>
                    <input className="username-confirm-input" type="password"placeholder="Confirm password"></input>
                    <span className="register-btn">Register</span>
                </div>
            </div>
        </div>
    )
}

export default Homepage;