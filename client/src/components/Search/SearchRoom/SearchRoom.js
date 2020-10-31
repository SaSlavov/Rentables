import React from 'react';
import './SearchRoom.css'

const SearchRoom = ({ selectedRooms, setSelectedRooms, showAllRooms, setShowAllRooms, isDeleteButtonForRoomsVisible, setIsDeleteButtonForRoomsVisible }) => {
    return (
        <>
            <div className="selected-rooms">

                {selectedRooms.length <= 0 && <p style={{ marginTop: 0 }}>Selected Rooms:</p>}

                {selectedRooms && selectedRooms.map((room, index) => {
                    if (!showAllRooms && index >= 5) {
                        return
                    }
                    return <div  className="selected-room-container" onMouseEnter={() => setIsDeleteButtonForRoomsVisible(index)} onMouseLeave={() => setIsDeleteButtonForRoomsVisible(false)}>
                        <p className="selected-room" >{room}, </p>
                        {isDeleteButtonForRoomsVisible === index && <span className="selected-room-delete-btn" onClick={() => { setSelectedRooms(selectedRooms.filter(currentRoom => currentRoom !== room)); setIsDeleteButtonForRoomsVisible(false) }}>X</span>}
                    </div>

                })}
                {selectedRooms.length > 5 && !showAllRooms && <>
                    <span className="show-more-selected-rooms" onClick={() => setShowAllRooms(!showAllRooms)}>
                        <svg height="21" width="21" xmlns="http://www.w3.org/2000/svg" viewBox="-100 -200 512 512"><path d="M304.394 139.394l-139.39 139.393L25.607 139.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0021.212-.001l149.996-150c5.858-5.858 5.858-15.355 0-21.213-5.857-5.857-15.355-5.858-21.212.001z" /><path d="M154.398 190.607a14.999 14.999 0 0021.212-.001l149.996-150c5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0l-139.39 139.393L25.607 19.393c-5.857-5.858-15.355-5.858-21.213 0-5.858 5.858-5.858 15.355 0 21.213l150.004 150.001z" /></svg></span>
                    <p className="show-more-p" >Show More: {selectedRooms.length - 5}</p>
                </>}
                {showAllRooms && <span className="show-more-selected-rooms" onClick={() => setShowAllRooms(!showAllRooms)}>
                    <svg height="21" width="21" xmlns="http://www.w3.org/2000/svg" viewBox="-100 -200 512 512"><path d="M25.607 190.607l139.39-139.393 139.396 139.393A14.955 14.955 0 00315 195c3.839 0 7.678-1.464 10.606-4.394 5.858-5.858 5.858-15.355 0-21.213l-150.003-150a14.997 14.997 0 00-21.213.001l-149.997 150c-5.858 5.858-5.858 15.355 0 21.213 5.858 5.858 15.356 5.858 21.214 0z" /><path d="M175.603 139.393a14.999 14.999 0 00-21.213.001l-149.996 150c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.857 15.355 5.858 21.213-.001l139.39-139.393 139.397 139.394A14.95 14.95 0 00315 315c3.839 0 7.678-1.464 10.606-4.394 5.858-5.858 5.858-15.355 0-21.213l-150.003-150z" /></svg></span>
                }
            </div>

            
        </>
    )
}

export default SearchRoom;