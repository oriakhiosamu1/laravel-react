import { createContext, useContext, useState } from "react";

// VARIABLES EXPECTED FROM THE BACKEND
const StateContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});


// CONTEXT SHARED
export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    function setToken(token){
        _setToken(token);
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return <StateContext.Provider value={{
        user,
        token,
        setUser,
        setToken,
     }}>
        {children}
    </StateContext.Provider>
}


// USECONTEXT HOOK EXPORTED
export const useStateContext = () => useContext(StateContext)

// export default ContextProvider;
