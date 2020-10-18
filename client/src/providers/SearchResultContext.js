const { createContext } = require("react");

export const extractData = () => {
    return localStorage.getItem('searchResult')
}

const SearchResultContext = createContext({
    data: null,    
    setDataState: () => { },
});

export default SearchResultContext;