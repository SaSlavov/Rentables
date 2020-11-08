import React, { useContext } from 'react';
import Login from '../../components/Login/Login';
import QuickSearch from '../../components/QuickSearch/QuickSearch';
import Recommended from '../../components/Recommended/Recommended';
import Register from '../../components/Register/Register';
import ActiveRegisterOrLogInContext from '../../providers/ActiveRegisterOrLogInContext';
import AuthContext from '../../providers/AuthContext';
import { useViewport } from '../../providers/ViewPortContext';
import Search from '../Search/Search';
import './Homepage.css'

const Homepage = () => {
    const { active } = useContext(ActiveRegisterOrLogInContext)
    const { isLoggedIn, } = useContext(AuthContext);
    const { width, height } = useViewport();
    const isMobile = width <= 700 ? true : false

    const updateClassNames = (className) => {
        return isMobile ? className += '-mobile' : className
    }

    return (
        <>
            {/* <div className="background" ></div> */}
            <div className={updateClassNames("homepage-container")}>
                {/* <div className="search-container">
                </div> */}
                    <Search />
                {/* <div className="recommended">
                </div> */}
                <Recommended />
                {!isLoggedIn && <div className={updateClassNames("make-them-register")}>
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
        </>
    )
}

export default Homepage;