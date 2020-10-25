import React, { useState } from 'react';
import { BASE_URL } from '../../common/constants';
import './Register.css'

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })


    const updateUser = (prop, value) => {
        setUser({
            ...user,
            [prop]: value
        })
    }

    const register = () => {
        fetch(`${BASE_URL}/users `, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user.username, password: user.password }),
        })
            .then(r => r.json())
            .then(result => {
                if (result.error) {
                    console.log(result.message)
                }
            })
            .catch(alert);
    }

    return (
        <div id="credentials-container">
            <h2>Register</h2>
            <input className="username-input" type="text" placeholder="username" onChange={(e) => updateUser('username', e.target.value)}></input>
            <input className="username-input" type="password" placeholder="password" onChange={(e) => updateUser('password', e.target.value)}></input>
            <input className="username-confirm-input" type="password" placeholder="Confirm password" onChange={(e) => updateUser('confirmPassword', e.target.value)}></input>
            <span className="register-btn" onClick={() => register()}>Register</span>
        </div>
    )
}

export default Register;