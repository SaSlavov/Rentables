import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';
import SearchResultContext from '../../providers/SearchResultContext';
import SingleApartmentContext from '../../providers/SingleApartmentContext';
import SingleApartment from '../SingleApartment/SingleApartment';
import './SearchResult.css'

const SearchResult = (props) => {
    const { data } = useContext(SearchResultContext);
    const { user } = useContext(AuthContext);
    const { setApartmentId } = useContext(SingleApartmentContext);
    const [isApartmentVisible, setIsApartmentvisible] = useState(false);
    const [clickedApartment, setClickedApartment] = useState(null)
    const searchResult = typeof data === 'string' ? JSON.parse(data) : data;
    const [favoriteApartments, setFavoriteApartments] = useState(null)
    const [heartClicked, setHeartClicked] = useState(false)
    const history = props.history

    const clickOnApartment = (apartmentId) => {
        setIsApartmentvisible(true)
        setClickedApartment(apartmentId)
    }

    useEffect(() => {
        fetch(`${BASE_URL}/apartments/favorite/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },

        })
            .then(r => r.json())
            .then(res => {
                // console.log(res)
                setFavoriteApartments(res.map(apartment => apartment.apartmentInfo.id));
            })
    }, [heartClicked])

    const likeApartment = (apartmentId) => {
        fetch(`${BASE_URL}/apartments/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
            body: JSON.stringify({ userId: user.id, apartmentId: apartmentId })
        })
            .then(r => r.json())
            .then(res => {
                // console.log(res)
                setHeartClicked(!heartClicked)
            })
    }
    const checkIfFavorite = (apartmentId) => {
        return favoriteApartments.includes(apartmentId)

    }

    return (
        <div className="search-result-container">

            <div className="background" ></div>
            {!isApartmentVisible && <div className="search-result">
                {searchResult.map(apartment => {
                    return <div
                        className="apartment"
                        key={apartment.id}>

                        <img className="recommended-apt-headImg" src={`${BASE_URL}/images/${apartment.images.images.split(' ')[0]}`} alt="apartment"></img>
                        <span className="heart-svg" onClick={() => likeApartment(apartment.id)}><svg height="21" width="21" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 446.171 446.171"><path d="M399.151 81.241c42.841 40.751 42.841 106.057 0 146.808l-20.898 19.853L223.608 394.71 68.963 247.902l-20.898-19.853c-42.841-40.751-42.841-106.057 0-146.808s111.804-40.751 154.645 0l20.898 19.853 20.898-19.853c42.841-40.751 111.804-40.751 154.645 0z" fill={favoriteApartments && checkIfFavorite(apartment.id) ? 'red' : 'grey'} /><path d="M223.608 410.384c-3.657 0-7.837-1.567-10.971-4.18L37.094 239.543C13.584 216.555 0 186.775 0 154.906s13.061-62.171 37.094-84.637c48.588-45.976 127.478-45.976 176.065 0l9.927 9.404 9.927-9.404c48.588-45.976 127.478-45.976 176.065 0 24.033 22.465 37.094 52.767 37.094 84.637s-13.061 62.171-37.094 84.637L234.58 406.204c-3.135 2.612-7.315 4.18-10.972 4.18zm-98.22-343.772c-24.033 0-48.065 8.882-66.351 26.122-17.763 16.718-27.167 38.661-27.167 62.171s9.927 45.453 27.167 62.171L223.608 373.29 388.18 217.078c17.763-16.718 27.167-38.661 27.167-62.171s-9.927-45.453-27.167-62.171c-36.571-35.004-96.131-35.004-133.225 0l-20.898 19.853c-6.269 5.747-15.673 5.747-21.42 0l-20.898-19.853c-18.286-17.765-42.319-26.124-66.351-26.124z" fill="#3a2c51" /></svg></span>

                        <p onClick={() => { setApartmentId({ apartmentId: apartment.id }); history.push('/apartment') }}>{apartment.title}</p>
                        <p>{apartment.rooms} rooms</p>
                        <p>{apartment.price}</p>
                    </div>
                })}
            </div>
            }
        </div>
    )
}

export default SearchResult;