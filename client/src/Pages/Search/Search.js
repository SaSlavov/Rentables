import React, { useRef, useState } from 'react';
import AdditionalInfo from '../../components/Search/AdditionalInfo/AdditionalInfo';
import SearchArea from '../../components/Search/SearchArea/SearchArea';
import SearchRoom from '../../components/Search/SearchRoom/SearchRoom';
import { suggestArea } from '../../utils/suggestArea';
import './Search.css'

const Search = () => {

    const [queryInfo, setQueryInfo] = useState({
        area: '',
        rooms: '',
        priceMin: 0,
        priceMax: 0,
    })

    const [suggestedArea, setSuggestedArea] = useState(null)
    const [selectedAreas, setSelectedAreas] = useState([])
    const [selectedRooms, setSelectedRooms] = useState([])
    const [isDeleteButtonForAreasVisible, setIsDeleteButtonForAreasVisible] = useState(null)
    const [isDeleteButtonForRoomsVisible, setIsDeleteButtonForRoomsVisible] = useState(null)
    const [showAllAreas, setShowAllAreas] = useState(null)
    const [showAllRooms, setShowAllRooms] = useState(null)
    const areaContainer = useRef(null)


    return (
        <>
            <div className="background" ></div>
            <div className="browse-container">
                <div className="search-options">
                    <div className="areas-rooms-result-container">
                        <SearchArea suggestedArea={suggestedArea} setSuggestedArea={setSuggestedArea} selectedAreas={selectedAreas} setSelectedAreas={setSelectedAreas} showAllAreas={showAllAreas} setShowAllAreas={setShowAllAreas} isDeleteButtonForAreasVisible={isDeleteButtonForAreasVisible} setIsDeleteButtonForAreasVisible={setIsDeleteButtonForAreasVisible} />
                        <SearchRoom selectedRooms={selectedRooms} setSelectedRooms={setSelectedRooms} showAllRooms={showAllRooms} setShowAllRooms={setShowAllRooms} isDeleteButtonForRoomsVisible={isDeleteButtonForRoomsVisible} setIsDeleteButtonForRoomsVisible={setIsDeleteButtonForRoomsVisible} />
                    </div>
                    <div className="main-info-input">
                        <input className="area" placeholder="Area" onBlur={(e) => !(e.relatedTarget && e.relatedTarget.className === "area-search-result") && setSuggestedArea(null)} onChange={(e) => e.target.value === '' ? setSuggestedArea(null) : setSuggestedArea(suggestArea(e.target.value))}></input>
                        <select className="rooms" placeholder="Rooms" onChange={(e) => !selectedRooms.includes(e.target.value) && setSelectedRooms([...selectedRooms, e.target.value])}>
                            <option value="Studio" selected >Rooms</option>
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
                        <AdditionalInfo />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;