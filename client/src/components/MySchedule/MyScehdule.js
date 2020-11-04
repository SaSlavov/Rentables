import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import './MySchedule.css'

const MySchedule = () => {
    const { user } = useContext(AuthContext);
    const [scheduleInfo, setScheduleInfo] = useState(null)

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
        <div className="schedule-container">
            <div id="grid-schedule-titles">
                <p> Title</p>
                <p >Date</p>
                <p >Time</p>
            </div>
            {scheduleInfo && scheduleInfo.map((info, index) => {
                return <div className="scheduled-apartment-info-container" key={index}>
                    <p className="scheduled-apartment-title">{info.apartment.title}</p>
                    <p className="scheduled-apartment-date">{info.date}</p>
                    <p className="scheduled-apartment-time">{info.time}</p>
                </div>
            })}
        </div>
    )
}

export default MySchedule;