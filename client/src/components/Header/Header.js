import React from 'react'
import { NavLink, withRouter,} from 'react-router-dom';
import './Header.css'

const Header = () => {

    return (
        <div className="header-container">
            <NavLink className="rents-btn" to="/search">
                <div>Search</div>
            </NavLink>
            <NavLink className="home-btn" to="/homepage">
                <div>Home</div>
            </NavLink>
            <NavLink className="login-btn" to="/search">
                <div>Log in</div>
            </NavLink>
            <NavLink className="signup-btn" to="/search">
                <div>Sign up</div>
            </NavLink>
        </div>
    )
}

export default withRouter(Header);