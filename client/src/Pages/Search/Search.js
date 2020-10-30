import React, { useRef, useState } from 'react';
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
    const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(null)
    const [showAllAreas, setShowAllAreas] = useState(null)
    const [showAllRooms, setShowAllRooms] = useState(null)
    const areaContainer = useRef(null)


    return (
        <>
            <div className="background" ></div>
            <div className="browse-container">
                <div className="search-options">
                    <SearchArea suggestedArea={suggestedArea} setSuggestedArea={setSuggestedArea} selectedAreas={selectedAreas} setSelectedAreas={setSelectedAreas} showAllAreas={showAllAreas} setShowAllAreas={setShowAllAreas} isDeleteButtonVisible={isDeleteButtonVisible} setIsDeleteButtonVisible={setIsDeleteButtonVisible}/>
                    <SearchRoom selectedRooms={selectedRooms} setSelectedRooms={setSelectedRooms} showAllRooms={showAllRooms} setShowAllRooms={setShowAllRooms} isDeleteButtonVisible={isDeleteButtonVisible} setIsDeleteButtonVisible={setIsDeleteButtonVisible}/>
                    

                    <input className="price-min" placeholder="Min.price" onChange={(e) => { }}></input>
                    <input className="price-max" placeholder="Max.price" onChange={(e) => { }}></input>
                </div>
            </div>
        </>
    )
}

export default Search;