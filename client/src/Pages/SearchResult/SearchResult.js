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
    const searchResult = typeof data === 'string' ? JSON.parse(data) : data;
    const [favoriteApartments, setFavoriteApartments] = useState(null)
    const [heartClicked, setHeartClicked] = useState(false)
    const [page, setPage] = useState(1)
    const history = props.history

    useEffect(() => {
        user && fetch(`${BASE_URL}/apartments/favorite/${user.id}`, {
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

    const displayResultByPage = (page) => {
        return searchResult.map((apartment, index) => {
            let count = page * 10
            if (index >= count - 10 && index < count) {

                return <div
                    className="apartment"
                    key={apartment.id}>

                    <img className="recommended-apt-headImg" src={`${BASE_URL}/images/${apartment.images.images.split(' ')[0]}`} alt="apartment"></img>
                    <span className="heart-svg" onClick={() => user && likeApartment(apartment.id)}><svg height="21" width="21" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 446.171 446.171"><path d="M399.151 81.241c42.841 40.751 42.841 106.057 0 146.808l-20.898 19.853L223.608 394.71 68.963 247.902l-20.898-19.853c-42.841-40.751-42.841-106.057 0-146.808s111.804-40.751 154.645 0l20.898 19.853 20.898-19.853c42.841-40.751 111.804-40.751 154.645 0z" fill={favoriteApartments && checkIfFavorite(apartment.id) ? 'red' : 'grey'} /><path d="M223.608 410.384c-3.657 0-7.837-1.567-10.971-4.18L37.094 239.543C13.584 216.555 0 186.775 0 154.906s13.061-62.171 37.094-84.637c48.588-45.976 127.478-45.976 176.065 0l9.927 9.404 9.927-9.404c48.588-45.976 127.478-45.976 176.065 0 24.033 22.465 37.094 52.767 37.094 84.637s-13.061 62.171-37.094 84.637L234.58 406.204c-3.135 2.612-7.315 4.18-10.972 4.18zm-98.22-343.772c-24.033 0-48.065 8.882-66.351 26.122-17.763 16.718-27.167 38.661-27.167 62.171s9.927 45.453 27.167 62.171L223.608 373.29 388.18 217.078c17.763-16.718 27.167-38.661 27.167-62.171s-9.927-45.453-27.167-62.171c-36.571-35.004-96.131-35.004-133.225 0l-20.898 19.853c-6.269 5.747-15.673 5.747-21.42 0l-20.898-19.853c-18.286-17.765-42.319-26.124-66.351-26.124z" fill="#3a2c51" /></svg></span>
                    <div className="single-apartment-info-container" onClick={() => { setApartmentId({ apartmentId: apartment.id }); history.push('/apartment') }}>
                        <p className="single-apartment-title" ><b>{apartment.area}</b>, {apartment.title}</p>
                        <p className="single-apartment-rooms">{apartment.rooms} rooms</p>
                        <p className="single-apartment-price">{apartment.price} €</p>
                    </div>
                </div>
            } else {
                return;
            }
        })
    }

    return (
        <div className="search-result-container">

            <div className="background" ></div>
            <div className="search-result">
                {displayResultByPage(page)}
            </div>
            <div className="pagination-container">
                <span onClick={() => page - 1 !== 0 && setPage(page - 1)}><svg className="page-back-btn" height="35" width="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 -100 512 512"><path d="M239.081 245.333L466.217 18.219a10.643 10.643 0 002.304-11.627C466.857 2.603 462.974 0 458.665 0h-192a10.744 10.744 0 00-7.552 3.115L24.446 237.781c-4.16 4.16-4.16 10.923 0 15.083l234.667 234.667a10.675 10.675 0 007.552 3.136h192c4.309 0 8.213-2.603 9.856-6.592a10.721 10.721 0 00-2.304-11.627L239.081 245.333z" /></svg></span>
                <p className="page">{page} / {Math.ceil(searchResult.length / 10)}</p>
                <span onClick={() => page !== Math.ceil(searchResult.length / 10) && setPage(page + 1)}><svg className="page-forward-btn" height="35" width="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 -100 512 512"><path d="M466.201 237.781L231.534 3.115A10.656 10.656 0 00224.003 0h-192c-4.309 0-8.213 2.603-9.856 6.592s-.725 8.555 2.304 11.627l227.136 227.115L24.451 472.448a10.643 10.643 0 00-2.304 11.627c1.664 3.989 5.547 6.592 9.856 6.592h192c2.837 0 5.547-1.131 7.552-3.115l234.667-234.667a10.68 10.68 0 00-.021-15.104z" /></svg></span>
            </div>
        </div>
    )
}

export default SearchResult;