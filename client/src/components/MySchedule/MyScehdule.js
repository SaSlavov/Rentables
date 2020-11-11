import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import './MySchedule.css'
import './MySchedule-mobile.css'
import { withRouter } from 'react-router-dom';
import SingleApartmentContext from '../../providers/SingleApartmentContext';

const MySchedule = ({updateClassNamesMobile, history}) => {
    const { user } = useContext(AuthContext);
    const [scheduleInfo, setScheduleInfo] = useState(null)
    const { setApartmentId } = useContext(SingleApartmentContext);


    useEffect(() => {
        fetch(`${BASE_URL}/favorite-info/${user.id}`, {
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
            // setAccountInfo(result)
            setScheduleInfo(result.sort((a, b) => a.date.localeCompare(b.date))) //Number(a.date.split('-')[1]) + Number(b.date.split('-')[1]))
        })
        .catch(alert);
    }, [])

    return (
        <div className={updateClassNamesMobile("schedule-container")}>
            <div id={updateClassNamesMobile("grid-schedule-titles")}>
                <p> Title</p>
                <p >Date</p>
                <p >Time</p>
            </div>
            {scheduleInfo && scheduleInfo.map((info, index) => {
                console.log(info)
                return <div className={updateClassNamesMobile("scheduled-apartment-info-container")} key={index}>
                    <p className={updateClassNamesMobile("scheduled-apartment-title")} onClick={() => { setApartmentId({ apartmentId: info.apartment.id }); history.push('/apartment') }}>{info.apartment.title}</p>
                    <p className={updateClassNamesMobile("scheduled-apartment-date")}>{info.date}</p>
                    <p className={updateClassNamesMobile("scheduled-apartment-time")}>{info.time}</p>
                </div>
            })}
        </div>
    )
}

export default withRouter(MySchedule);