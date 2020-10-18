const { createContext } = require("react");

const SearchResultContext = createContext({
    data: null,    
    setDataState: () => { },
});

export default SearchResultContext;