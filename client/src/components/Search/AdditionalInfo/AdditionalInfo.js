import React from 'react';
import './AdditionalInfo.css'

const AdditionalInfo = ({isMobile, updateQueryInfo}) => {

    const updateClassNames = (className) => {
        return isMobile? className += '-mobile' : className
    }
    return (
        <>
            <select className={updateClassNames("furnished")} onChange={(e) => e.target.value === "not selected" ? updateQueryInfo('furnishing', '') : updateQueryInfo('furnishing', e.target.value)}>
                <option value="not selected" defaultValue>Choose furnishing</option>
                <option value="furnished" >Furnished</option>
                <option value="partially furnished">Partially furnished</option>
                <option value="not furnished">Not furnished</option>
                
            </select>
            <select className={updateClassNames("construction")}  onChange={(e) => e.target.value === "not selected" ? updateQueryInfo('construction', '') : updateQueryInfo('construction', e.target.value)}>
                <option value="not selected" defaultValue >Choose construction</option>
                <option value="brick"  >Brick</option>
                <option value="panel">Panel</option>
                <option value="EPK">EPK</option>
                
            </select>
            <select className={updateClassNames("parking")}  onChange={(e) =>  e.target.value === "not selected" ? updateQueryInfo('parking', '') : updateQueryInfo('parking', e.target.value)}>
                <option value="not selected" defaultValue >Choose parking</option>
                <option value="no parking" >No parking</option>
                <option value="dedicated spot">Dedicated spot</option>
                <option value="garage">Garage</option>
                
            </select>

        </>
    )
}

export default AdditionalInfo;