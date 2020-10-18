import React from 'react'
import { NavLink, withRouter,} from 'react-router-dom';
import './Header.css'

const Header = () => {

    return (
        <div className="header-container">
            <NavLink className="rents-btn" to="/search">
                <div>Search</div>
            </NavLink>
        </div>
    )
}

export default withRouter(Header);