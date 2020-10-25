import React, { useContext, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router-dom';

const Login = (props) => {
    const history = props.history;
    const { setLoginState } = useContext(AuthContext);


    const [user, setUser] = useState({
        username: '',
        password: '',
    })

    const updateUser = (prop, value) => {
        setUser({
            ...user,
            [prop]: value
        })
    }

    const login = () => {
        fetch(`${BASE_URL}/session `, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user.username, password: user.password }),
        })
            .then(r => r.json())
            .then(result => {
                if (result.error) {
                    throw new Error(result.message);
                }
                const payload = jwtDecode(result.token);

                setLoginState({ isLoggedIn: true, user: payload });
                localStorage.setItem('token', result.token);
                history.push('/homepage');
                
            })
    }

    return(
        <div id="credentials-container">
            <h2>Log in</h2>
            <input className="username-input" type="text" placeholder="username" onChange={(e) => updateUser('username', e.target.value)}></input>
            <input className="username-input" type="password" placeholder="password" onChange={(e) => updateUser('password', e.target.value)}></input>
            <span className="register-btn" onClick={() => login()}>Log in</span>
        </div>
    )
}

export default withRouter(Login);