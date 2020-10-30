import React, { useRef, useState } from 'react';
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
    const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(null)
    const areaInput = useRef(null)

    return (
        <>
            <div className="background" ></div>
            <div className="browse-container">
                <div className="search-options">
                    <div className="selected-areas">
                        {selectedAreas && selectedAreas.map((area, index) => {
                                return <div className="selected-area-container" onMouseEnter={() => setIsDeleteButtonVisible(index)} onMouseLeave={() => setIsDeleteButtonVisible(false)}>
                                    <p className="selected-area" >{area}, </p>
                                    {isDeleteButtonVisible === index && <a className="selected-area-delete-btn" onClick={() => { setSelectedAreas(selectedAreas.filter(currentArea => currentArea !== area)); setIsDeleteButtonVisible(false) }}>X</a>}
                                </div>

                            })}
                    </div>
                    <div className="area-container">
                        <input className="area" ref={areaInput} placeholder="Area" onChange={(e) => e.target.value === '' ? setSuggestedArea(null) : setSuggestedArea(suggestArea(e.target.value))}></input>
                        {suggestedArea &&
                            <div className="area-search-result">
                                {suggestedArea.map(area => {
                                    return <p className="suggested-area" onClick={() => !selectedAreas.includes(area) && setSelectedAreas([...selectedAreas, area])}>{area}</p>
                                })}
                            </div>
                        }
                    </div>
                    <input className="rooms" placeholder="Rooms" onChange={(e) => { }}></input>
                    <input className="price-min" placeholder="Min.price" onChange={(e) => { }}></input>
                    <input className="price-max" placeholder="Max.price" onChange={(e) => { }}></input>
                </div>
            </div>
        </>
    )
}

export default Search;