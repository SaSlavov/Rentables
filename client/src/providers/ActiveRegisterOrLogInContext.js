const { createContext } = require("react");

const ActiveRegisterOrLogInContext = createContext({
    active: null,    
    setActiveState: () => { },
});

export default ActiveRegisterOrLogInContext;