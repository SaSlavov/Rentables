import React, { useContext } from 'react';
import Login from '../../components/Login/Login';
import QuickSearch from '../../components/QuickSearch/QuickSearch';
import Recommended from '../../components/Recommended/Recommended';
import Register from '../../components/Register/Register';
import ActiveRegisterOrLogInContext from '../../providers/ActiveRegisterOrLogInContext';
import AuthContext from '../../providers/AuthContext';
import './Homepage.css'

const Homepage = () => {
    const { active } = useContext(ActiveRegisterOrLogInContext)
    const { isLoggedIn, } = useContext(AuthContext);


    return (
        <div className="homepage-container">
            {/* <img className="varna-image" src="https://trud.bg/public/images/articles/2020-07/%D0%B2%D0%B0%D1%80%D0%BD%D0%B022_6175783433033857334_original.jpg" alt="Varna"></img> */}
            <div className="varna-image"></div>
            <QuickSearch />
            <div className="recommended">
                <Recommended />
            </div>
            { !isLoggedIn && <div className="make-them-register">
                <div className="reasons">
                    <h1>Why you should consider making an account:</h1>
                    <p> - You could add apartments to your favorites</p>
                    <p> - There you could write comments about each one</p>
                    <p> - Can add the the day and time of your arrangement to see the apartment</p>
                </div>
                {active === 'register'
                    ? <Register />
                    : <Login />}
            </div>}
        </div>
    )
}

export default Homepage;