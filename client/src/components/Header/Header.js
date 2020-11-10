import React, { useContext, useEffect, useState } from 'react'
import { NavLink, withRouter, } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import ActiveRegisterOrLogInContext from '../../providers/ActiveRegisterOrLogInContext';
import AuthContext from '../../providers/AuthContext';
import { useViewport } from '../../providers/ViewPortContext';
import './Header.css'

const Header = (props) => {

    const { setActiveState } = useContext(ActiveRegisterOrLogInContext);
    const { user, isLoggedIn, setLoginState } = useContext(AuthContext);
    const { width, height } = useViewport();
    const isMobile = width <= 700 ? true : false
    const [isBurgerBtnClicked, setIsBurgerBtnClicked] = useState(false)
    const [location, setLocation] = useState(null)

    const history = props.history;

    useEffect(() => {
        if (location !== props.location.pathname) {
            console.log('diff')
            setLocation(props.location.pathname);
            setIsBurgerBtnClicked(false);
        }
    }, [props.location.pathname])

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
            {isMobile
                ? <div className="header-container-mobile">
                    <span onClick={() => setIsBurgerBtnClicked(!isBurgerBtnClicked)}><svg className="burger-menu-btn" height="30" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M53.333 106.667H416c29.417 0 53.333-23.927 53.333-53.333S445.417 0 416 0H53.333C23.917 0 0 23.927 0 53.333s23.917 53.334 53.333 53.334zM416 181.333H53.333C23.917 181.333 0 205.26 0 234.667S23.917 288 53.333 288H416c29.417 0 53.333-23.927 53.333-53.333S445.417 181.333 416 181.333zM416 362.667H53.333C23.917 362.667 0 386.594 0 416s23.917 53.333 53.333 53.333H416c29.417 0 53.333-23.927 53.333-53.333S445.417 362.667 416 362.667z" /></svg></span>
                    {isBurgerBtnClicked && <div className="burger-menu">
                        {isLoggedIn
                            ? <>
                                <NavLink className="profile-btn-mobile" to="/profile">
                                    <div>Profile</div>
                                </NavLink>
                                <NavLink className="home-btn-mobile" to="/homepage">
                                    <div>Home</div>
                                </NavLink>
                                <NavLink className="favorite-btn-mobile" to="/favorite">
                                    <div>Favorites</div>
                                </NavLink>
                                <NavLink className="new-ad-btn-mobile" to="/new_ad">
                                    <div>New ad</div>
                                </NavLink>
                                <NavLink className="my-ads-btn-mobile" to="/my_ads">
                                    <div>My ads</div>
                                </NavLink>
                                <NavLink className="logout-btn-mobile" to="/homepage">
                                    <div onClick={(e) => logout(e)}>Log out</div>
                                </NavLink>
                            </>
                            : <>

                                <NavLink className="home-btn-mobile" to="/homepage">
                                    <div>Home</div>
                                </NavLink>
                                <a className="login-btn-mobile" href="#credentials-container" onClick={() => setActiveState({ active: 'login' })}>Log in</a>
                                <a className="signup-btn-mobile" href="#credentials-container" onClick={() => setActiveState({ active: 'register' })}>Sign up</a>

                            </>}
                    </div>}
                </div>
                : <div className="header-container-desktop">
                    {isLoggedIn
                        ? <>
                            <NavLink className="profile-btn" to="/profile">
                                <div>Profile</div>
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
                            <NavLink className="home-btn" to="/homepage">
                                <div>Home</div>
                            </NavLink>
                            <a className="login-btn" href="#credentials-container" onClick={() => setActiveState({ active: 'login' })}>Log in</a>
                            <a className="signup-btn" href="#credentials-container" onClick={() => setActiveState({ active: 'register' })}>Sign up</a>

                        </>}
                </div>
            }


        </div>
    )
}

export default withRouter(Header);