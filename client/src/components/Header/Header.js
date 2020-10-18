import React from 'react'
import { NavLink, withRouter,} from 'react-router-dom';

const Header = () => {

    return (
        <div className="header-container">
            <NavLink to="/search">
                <div className="rents-btn">Search</div>
            </NavLink>
        </div>
    )
}

export default withRouter(Header);