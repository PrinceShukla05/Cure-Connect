import axios from "axios"
import { createContext } from "react"
import { useState } from "react"
import { toast } from "react-toastify"

export const AdminContext=createContext()

const AdminContextProvider= (props)=>{

    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors,setDoctors]=useState([])
    const [appointments,setAppointments]= useState([])
    const [dashData,setDashData]= useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors =async()=>{
        if (!aToken) {
            toast.error('Session expired. Please login again.');
            setAToken('');
            localStorage.removeItem('aToken');
            return;
        }
        try{
            const {data}=await axios.post(backendUrl + '/api/admin/all-doctors',{},{headers:{atoken: aToken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }
            else{
                if (data.message && data.message.toLowerCase().includes('not authorized')) {
                    toast.error('Session expired. Please login again.');
                    setAToken('');
                    localStorage.removeItem('aToken');
                } else {
                    toast.error(data.message)
                }
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId)=> {
        if (!aToken) {
            toast.error('Session expired. Please login again.');
            setAToken('');
            localStorage.removeItem('aToken');
            return;
        }
        try {
            const {data} =await axios.post(backendUrl + '/api/admin/change-availability', {docId} ,{headers:{atoken: aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }
            else{
                if (data.message && data.message.toLowerCase().includes('not authorized')) {
                    toast.error('Session expired. Please login again.');
                    setAToken('');
                    localStorage.removeItem('aToken');
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async()=>{
        if (!aToken) {
            toast.error('Session expired. Please login again.');
            setAToken('');
            localStorage.removeItem('aToken');
            return;
        }
        try {
            const {data}= await axios.get(backendUrl+'/api/admin/appointments',{headers:{atoken: aToken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }
            else{
                if (data.message && data.message.toLowerCase().includes('not authorized')) {
                    toast.error('Session expired. Please login again.');
                    setAToken('');
                    localStorage.removeItem('aToken');
                } else {
                    toast.success(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async(appointmentId)=>{
        if (!aToken) {
            toast.error('Session expired. Please login again.');
            setAToken('');
            localStorage.removeItem('aToken');
            return;
        }
        try {
            const {data}= await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{atoken: aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }
            else{
                if (data.message && data.message.toLowerCase().includes('not authorized')) {
                    toast.error('Session expired. Please login again.');
                    setAToken('');
                    localStorage.removeItem('aToken');
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData= async()=>{
        if (!aToken) {
            toast.error('Session expired. Please login again.');
            setAToken('');
            localStorage.removeItem('aToken');
            return;
        }
        try {
            const {data}= await axios.get(backendUrl+'/api/admin/dashboard',{headers:{atoken: aToken}})
            if(data.success){
                setDashData(data.dashData)
            }
            else{
                if (data.message && data.message.toLowerCase().includes('not authorized')) {
                    toast.error('Session expired. Please login again.');
                    setAToken('');
                    localStorage.removeItem('aToken');
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value={
        aToken,setAToken,
        backendUrl,doctors,
        getAllDoctors, changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
