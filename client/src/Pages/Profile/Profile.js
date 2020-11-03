import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import './Profile.css'

const Profile = () => {
    const { user } = useContext(AuthContext)
    const [isEditActive, setIsEditActive] = useState(false)
    const [activeButtons, setActiveButtons] = useState({
        info: true,
        myAdsButton: false,
        favorites: false,
        newAd: false,
    })

    const [accountInfo, setAccountInfo] = useState({
        userId: user.id,
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
    })

    useEffect(() => {
        fetch(`${BASE_URL}/users/${user.id} `, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(r => r.json())
            .then(result => {
                if (result.error) {
                    console.log(result.message)
                }
                console.log(result)
                setAccountInfo(result)
            })
            .catch(alert);
    }, [])

    const updateAccountInfo = (prop, value) => {
        setAccountInfo({
            ...accountInfo,
            [prop]: value,
        })
    }

    const updateActiveButtons = (prop) => {
        const buttons = Object.keys(activeButtons);
        const temporaryState = {};
        temporaryState[prop] = true;

        for (let key of buttons) {
            if (key === prop) {
                console.log('prop');
                continue;
            }
            temporaryState[key] = false;
        }

        setActiveButtons(temporaryState);

    }
    console.log(accountInfo)

    const updateClassNames = (className) => {
        const buttons = Object.keys(activeButtons)

        for (let key of buttons) {
            if (key === className && activeButtons[className]) {
                return className += "-active";
            } else {
                return className
            }
        }
    }

    const updateBase = () => {
        fetch(`${BASE_URL}/users `, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountInfo),
        })
            .then(r => r.json())
            .then(result => {
                if (result.error) {
                    console.log(result.message)
                }
                setAccountInfo(result)
            })
            .catch(alert);
    }


    return (
        <>
            <div className="background" ></div>
            <div className="profile-container">
                <div className="menu-select-container">
                    <span className={updateClassNames("info")} onClick={() => updateActiveButtons("info")}>Info</span>
                    {activeButtons.myAdsButton && <div className="shadow"></div>}
                    <span className={updateClassNames("myAdsButton")} onClick={() => updateActiveButtons("myAdsButton")}>My ads</span>
                    {activeButtons.favorites && <div className="shadow"></div>}
                    <span className={updateClassNames("favorites")} onClick={() => updateActiveButtons("favorites")}>Favorites</span>
                    {activeButtons.newAd && <div className="shadow"></div>}
                    <span className={updateClassNames("newAd")} onClick={() => updateActiveButtons("newAd")}>New ad</span>
                </div>

                <div className="info-container">
                    <label className="username-label">Username:</label>
                    {isEditActive 
                    ? <input className="profile-username-input" onChange={(e) => updateAccountInfo('username', e.target.value)}></input>
                    : <p className="profile-username">{accountInfo.username}</p>}
                    <label className="firstName-label">First name: </label>
                    {isEditActive 
                    ? <input className="profile-firstName-input" onChange={(e) => updateAccountInfo('firstName', e.target.value)}></input>
                    : <p className="profile-firstName">{accountInfo.firstName}</p>}
                    <label className="lastName-label">Last name: </label>
                    {isEditActive 
                    ? <input className="profile-lastName-input" onChange={(e) => updateAccountInfo('lastName', e.target.value)}></input>
                    : <p className="profile-lastName">{accountInfo.lastName}</p> }
                    <label className="phone-label">Phone: </label>
                    {isEditActive 
                    ? <input className="profile-phone-input" onChange={(e) => updateAccountInfo('phone', e.target.value)}></input>
                    : <p className="profile-phone">{accountInfo.phone}</p>}
                    <span className="edit-btn" onClick={() => {setIsEditActive(!isEditActive); isEditActive && updateBase()}}>{isEditActive ? 'Update' : 'Edit'}</span>
                </div>
            </div>
        </>
    )
}

export default Profile;