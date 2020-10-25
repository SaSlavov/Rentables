export const logout = (e) => {
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
        .catch(result => setErrorMsg(result.message))

    if (errorMsg) {
        return (
            <h3>{errorMsg.message}</h3>
        );
    };
}