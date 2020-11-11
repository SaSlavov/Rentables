import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import MyAdsStatistics from '../../components/MyAdsStatistics/MyAdsStatistics';
import MySchedule from '../../components/MySchedule/MyScehdule';
import AuthContext from '../../providers/AuthContext';
import RecommendedList from '../../components/RecommendedList/RecommendedList'
import { useViewport } from '../../providers/ViewPortContext';
import './Profile.css'
import './Profile-mobile.css'

const Profile = () => {
    const { user } = useContext(AuthContext)
    const [isEditActive, setIsEditActive] = useState(false)
    const { width, height } = useViewport();
    const isMobile = width <= 700 ? true : false;
    const [activeButtons, setActiveButtons] = useState({
        info: true,
        myAdsButton: false,
        schedule: false,
        recommended: false,
    })

    const [accountInfo, setAccountInfo] = useState({
        userId: user.id,
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
    })

    const updateClassNamesMobile = (className) => {
        return isMobile? className += '-mobile' : className
    }

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
    // console.log(accountInfo)

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
            <div className={updateClassNamesMobile("profile-container")}>
                <div className={updateClassNamesMobile("menu-select-container")}>
                    <span className={updateClassNames("info")} onClick={() => updateActiveButtons("info")}>Info</span>
                    {activeButtons.myAdsButton && <div className={updateClassNamesMobile("shadow")}></div>}
                    <span className={updateClassNames("myAdsButton")} onClick={() => updateActiveButtons("myAdsButton")}>My ads</span>
                    {activeButtons.schedule && <div className={updateClassNamesMobile("shadow")}></div>}
                    <span className={updateClassNames("schedule")} onClick={() => updateActiveButtons("schedule")}>My schedule</span>
                    {activeButtons.recommended && <div className={updateClassNamesMobile("shadow")}></div>}
                    {user.role === 'admin' && <span className={updateClassNames("recommended")} onClick={() => updateActiveButtons("recommended")}>Recommended</span>}
                    {/* {activeButtons.newAd && <div className="shadow"></div>} */}
                </div>

                {activeButtons.info && <div className={updateClassNamesMobile("info-container")}>
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
                </div>}
                { activeButtons.myAdsButton && <MyAdsStatistics isMobile={isMobile} updateClassNamesMobile={updateClassNamesMobile}/>}
                { activeButtons.schedule && <MySchedule  isMobile={isMobile} updateClassNamesMobile={updateClassNamesMobile}/>}
                { activeButtons.recommended && <RecommendedList  isMobile={isMobile} updateClassNamesMobile={updateClassNamesMobile}/>}
            </div>
        </>
    )
}

export default Profile;