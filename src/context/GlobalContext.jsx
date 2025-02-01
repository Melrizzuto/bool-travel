import { createContext, useEffect, useState } from "react";
import travels from "../data/travel.js";
export const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {
    
    const [search, setSearch] = useState("");
    const [travelsState, setTravelsState] = useState(travels);

    const contextValue = { search, setSearch, travelsState, setTravelsState };

    return (
        
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
};