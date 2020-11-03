import React, { useContext } from 'react'
import { NavLink, withRouter, } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import ActiveRegisterOrLogInContext from '../../providers/ActiveRegisterOrLogInContext';
import AuthContext from '../../providers/AuthContext';
import './Header.css'

const Header = (props) => {

    const { setActiveState } = useContext(ActiveRegisterOrLogInContext);
    const { user, isLoggedIn, setLoginState } = useContext(AuthContext);    
    const history = props.history;

    const logout = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')

        setLoginState({
            isLoggedIn: false,
            user: null,
        });

        history.push('/homepage')

        fetch(`${BASE_URL}/session`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token || ''}`,
            },
            body: JSON.stringify({ user: user }),

        })
            .then(response => response.json())
            .then(result => {
                localStorage.removeItem('token');
            })

    }


    return (
        <div className="header-container">
            { isLoggedIn
                ? <>
                    <NavLink className="profile-btn" to="/profile">
                        <div>Profile</div>
                    </NavLink>
                    <NavLink className="rents-btn" to="/search">
                        <div>Search</div>
                    </NavLink>
                    <NavLink className="home-btn" to="/homepage">
                        <div>Home</div>
                    </NavLink>
                    <NavLink className="favorite-btn" to="/favorite">
                        <div>Favorites</div>
                    </NavLink>
                    <NavLink className="new-ad-btn" to="/new_ad">
                        <div>New ad</div>
                    </NavLink>
                    <NavLink className="my-ads-btn" to="/my_ads">
                        <div>My ads</div>
                    </NavLink>
                    <NavLink className="logout-btn" to="/homepage">
                        <div onClick={(e) => logout(e)}>Log out</div>
                    </NavLink>
                </>
                : <>
                    <NavLink className="rents-btn" to="/search">
                        <div>Search</div>
                    </NavLink>
                    <NavLink className="home-btn" to="/homepage">
                        <div>Home</div>
                    </NavLink>
                    <a className="login-btn" href="#credentials-container" onClick={() => setActiveState({ active: 'login' })}>Log in</a>
                    <a className="signup-btn" href="#credentials-container" onClick={() => setActiveState({ active: 'register' })}>Sign up</a>

                </>}



        </div>
    )
}

export default withRouter(Header);