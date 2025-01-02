// <<<<<<< HEAD
// import {create}
// =======
import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'


    const value = {
        doctors, currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
// >>>>>>> b2396c12ac80d0f9895a2ce90bd14e35f46ea7d4
