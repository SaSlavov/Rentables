import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import AdditionalInfo from '../../components/Search/AdditionalInfo/AdditionalInfo';
import SearchArea from '../../components/Search/SearchArea/SearchArea';
import SearchRoom from '../../components/Search/SearchRoom/SearchRoom';
import SearchResultContext from '../../providers/SearchResultContext';
import { suggestArea } from '../../utils/suggestArea';
import './Search.css'
import './Search-mobile.css'
import { useViewport } from '../../providers/ViewPortContext';

const Search = (props) => {

    const [suggestedArea, setSuggestedArea] = useState(null)
    const [selectedAreas, setSelectedAreas] = useState([])
    const [selectedRooms, setSelectedRooms] = useState([])
    const [isDeleteButtonForAreasVisible, setIsDeleteButtonForAreasVisible] = useState(null)
    const [isDeleteButtonForRoomsVisible, setIsDeleteButtonForRoomsVisible] = useState(null)
    const [showAllAreas, setShowAllAreas] = useState(null)
    const [showAllRooms, setShowAllRooms] = useState(null)
    const { setDataState } = useContext(SearchResultContext)
    const { width } = useViewport();
    const isMobile = width <= 700 ? true : false

    const updateClassNames = (className) => {
        return isMobile? className += '-mobile' : className
    }

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
            {/* <div className="background" ></div> */}
            <div className={updateClassNames('browse-container')}>
                <div className={updateClassNames("search-options")}>
                    <div className={updateClassNames("areas-rooms-result-container")}>
                        <SearchArea isMobile={isMobile} suggestedArea={suggestedArea} setSuggestedArea={setSuggestedArea} selectedAreas={selectedAreas} setSelectedAreas={setSelectedAreas} showAllAreas={showAllAreas} setShowAllAreas={setShowAllAreas} isDeleteButtonForAreasVisible={isDeleteButtonForAreasVisible} setIsDeleteButtonForAreasVisible={setIsDeleteButtonForAreasVisible}  queryInfo={queryInfo} updateQueryInfo={updateQueryInfo} />
                        <SearchRoom isMobile={isMobile} selectedRooms={selectedRooms} setSelectedRooms={setSelectedRooms} showAllRooms={showAllRooms} setShowAllRooms={setShowAllRooms} isDeleteButtonForRoomsVisible={isDeleteButtonForRoomsVisible} setIsDeleteButtonForRoomsVisible={setIsDeleteButtonForRoomsVisible} />
                    </div>
                    <div className={updateClassNames("main-info-input")}>
                        <input className={updateClassNames("area")} placeholder="Area" onBlur={(e) => !(e.relatedTarget && e.relatedTarget.className === "area-search-result") && setSuggestedArea(null)} onChange={(e) => e.target.value === '' ? setSuggestedArea(null) : setSuggestedArea(suggestArea(e.target.value))}></input>
                        <select className={updateClassNames("rooms")} placeholder="Rooms" onChange={(e) => !selectedRooms.includes(e.target.value) && setSelectedRooms([...selectedRooms, e.target.value])}>
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
                        <input className={updateClassNames("price-min")} placeholder="Min.price" onChange={(e) => { }}></input>
                        <input className={updateClassNames("price-max")} placeholder="Max.price" onChange={(e) => { }}></input>
                        <AdditionalInfo isMobile={isMobile} updateQueryInfo={updateQueryInfo}/>
                    </div>
                    <span className="full-search-btn" onClick={() => filterApartments()}>Search</span>
                </div>
            </div>
        </>
    )
}

export default withRouter(Search);