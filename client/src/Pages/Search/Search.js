import React, { useContext, useState } from 'react';
import { BASE_URL } from '../../common/constants';
import AdditionalInfo from '../../components/Search/AdditionalInfo/AdditionalInfo';
import SearchArea from '../../components/Search/SearchArea/SearchArea';
import SearchRoom from '../../components/Search/SearchRoom/SearchRoom';
import SearchResultContext from '../../providers/SearchResultContext';
import { suggestArea } from '../../utils/suggestArea';
import './Search.css'

const Search = (props) => {

    const [suggestedArea, setSuggestedArea] = useState(null)
    const [selectedAreas, setSelectedAreas] = useState([])
    const [selectedRooms, setSelectedRooms] = useState([])
    const [isDeleteButtonForAreasVisible, setIsDeleteButtonForAreasVisible] = useState(null)
    const [isDeleteButtonForRoomsVisible, setIsDeleteButtonForRoomsVisible] = useState(null)
    const [showAllAreas, setShowAllAreas] = useState(null)
    const [showAllRooms, setShowAllRooms] = useState(null)
    const { setDataState } = useContext(SearchResultContext)


    const [queryInfo, setQueryInfo] = useState({
        area: '',
        rooms: '',
        priceMin: 0,
        priceMax: 0,
        construction: '',
        furnishing: '',
        parking: '',
    })

    const updateQueryInfo = (prop, value) => {
        setQueryInfo({
            ...queryInfo,
            [prop]: value,
        })
    }
    const filterApartments = () => {

        fetch(`${BASE_URL}/apartments/filter?area=${selectedAreas.join('_')}&rooms=${selectedRooms.join('_')}&priceMin=${queryInfo.priceMin}&priceMax=${queryInfo.priceMax}&construction=${queryInfo.construction}&furnishing=${queryInfo.furnishing}&parking=${queryInfo.parking}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },

        })
            .then(r => r.json())
            .then(res => {
                localStorage.setItem('searchResult', JSON.stringify(res))
                setDataState({ data: JSON.stringify(res) });
                props.history.push('/apartments');
            })

    }

    return (
        <>
            <div className="background" ></div>
            <div className="browse-container">
                <div className="search-options">
                    <div className="areas-rooms-result-container">
                        <SearchArea suggestedArea={suggestedArea} setSuggestedArea={setSuggestedArea} selectedAreas={selectedAreas} setSelectedAreas={setSelectedAreas} showAllAreas={showAllAreas} setShowAllAreas={setShowAllAreas} isDeleteButtonForAreasVisible={isDeleteButtonForAreasVisible} setIsDeleteButtonForAreasVisible={setIsDeleteButtonForAreasVisible}  queryInfo={queryInfo} updateQueryInfo={updateQueryInfo} />
                        <SearchRoom selectedRooms={selectedRooms} setSelectedRooms={setSelectedRooms} showAllRooms={showAllRooms} setShowAllRooms={setShowAllRooms} isDeleteButtonForRoomsVisible={isDeleteButtonForRoomsVisible} setIsDeleteButtonForRoomsVisible={setIsDeleteButtonForRoomsVisible} />
                    </div>
                    <div className="main-info-input">
                        <input className="area" placeholder="Area" onBlur={(e) => !(e.relatedTarget && e.relatedTarget.className === "area-search-result") && setSuggestedArea(null)} onChange={(e) => e.target.value === '' ? setSuggestedArea(null) : setSuggestedArea(suggestArea(e.target.value))}></input>
                        <select className="rooms" placeholder="Rooms" onChange={(e) => !selectedRooms.includes(e.target.value) && setSelectedRooms([...selectedRooms, e.target.value])}>
                            <option value="not selected" defaultValue >Choose rooms</option>
                            <option value="Studio">Studio</option>
                            <option value="One-room">One-room</option>
                            <option value="Two-room">Two-room</option>
                            <option value="Three-room">Three-room</option>
                            <option value="Multi-bedroom">Multi-bedroom</option>
                            <option value="Maisonette">Maisonette</option>
                            <option value="House">House</option>
                            <option value="Storey of a house">Storey of a house</option>
                        </select>
                        <input className="price-min" placeholder="Min.price" onChange={(e) => { }}></input>
                        <input className="price-max" placeholder="Max.price" onChange={(e) => { }}></input>
                        <AdditionalInfo queryInfo={queryInfo} updateQueryInfo={updateQueryInfo}/>
                    </div>
                    <span className="full-search-btn" onClick={() => filterApartments()}>Search</span>
                </div>
            </div>
        </>
    )
}

export default Search;