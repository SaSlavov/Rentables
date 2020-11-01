const { createContext } = require("react");

export const extractApartmentID = () => {
    return localStorage.getItem('apartmentId')
}

const SingleApartmentContext = createContext({
    apartmentId: null,    
    setApartmentId: () => { },
});

export default SingleApartmentContext;