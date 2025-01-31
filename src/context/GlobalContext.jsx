import { createContext, useEffect, useState } from "react";
export const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {
    
    const [search, setSearch] = useState("");

    const contextValue = { search, setSearch };

    return (

        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
};