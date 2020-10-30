import React from 'react';
import './AdditionalInfo.css'

const AdditionalInfo = () => {
    return (
        <>
            <select className="furnished"  onChange={(e) => {}}>
                <option value="furnished" selected >Furnished</option>
                <option value="partially furnished">Partially furnished"</option>
                <option value="not furnished">Not furnished</option>
                
            </select>
            <select className="construction"  onChange={(e) => {}}>
                <option value="brick" selected >Brick</option>
                <option value="panel">Panel</option>
                <option value="EPK">EPK</option>
                
            </select>
            <select className="parking"  onChange={(e) => {}}>
                <option value="no parking" selected >No parking</option>
                <option value="dedicated spot">Dedicated spot</option>
                <option value="garage">Garage</option>
                
            </select>

        </>
    )
}

export default AdditionalInfo;