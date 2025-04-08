import { createContext, useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import {toast} from 'react-toastify'
// <<<<<<< HEAD
// import {create}
// =======
<<<<<<< HEAD
//import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";
=======
import { createContext } from "react";
>>>>>>> ba0caae0553f789aeeea36ce12a0a77d6aa62e5a


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol ='$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)

    const [userData,setUserData] = useState(false)

    const getDoctorsData=async ()=>{
        try {
            const {data}= await axios.get(backendUrl+'/api/doctor/list')

            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})

            if(data.success){
                setUserData(data.userData)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

// import { createContext } from "react";
// import { doctors } from "../assets/assets_frontend/assets";


// export const AppContext = createContext()

// const AppContextProvider = (props) => {

//     const currencySymbol = '₹'

//     const value = {
//         doctors, currencySymbol
//     }
//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }

// export default AppContextProvider