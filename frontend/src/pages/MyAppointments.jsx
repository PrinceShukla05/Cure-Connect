<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {

  const {backendUrl,token, getDoctorsData} = useContext(AppContext)

  const [appointments,setAppointments]=useState([])
  const navigate = useNavigate()

  const months=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']

  const slotDateFormat = (slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserAppointments = async()=>{
    try {
      const {data}= await axios.get(backendUrl+'/api/user/appointents',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())// to get latest appointment on top
        console.log(data.appointments)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment= async (appointmentId)=>{
    try {
      const {data}= await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId,headers:{token}})

      if(data.success){
        toast.success(data.message)
        getUserAppointments()
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
      getDoctorsData()
    }
  },[token])
=======
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const { doctors } = useContext(AppContext)
>>>>>>> ba0caae0553f789aeeea36ce12a0a77d6aa62e5a

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
<<<<<<< HEAD
        {appointments.map((item,index)=>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>

            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {item.cancelled && !item.isCompleted && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
             {item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-300'>Cancel Appointment</button>} 
             {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
             {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
=======
        {
          doctors.slice(0, 2).map((item, index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-red-100' src={item.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-nwutral-800 font-semibold'> {item.name} </p>
                <p> {item.speciality} </p>
                <p className='text-zinx-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>  {item.address.line1} </p>
                <p className='text-xs'>  {item.address.line2} </p>
                <p className='text-sm mt-1'>  <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 25, July 2025 | 8:30 </p>
              </div>
              <div></div>
              <div className='flex flex-col justify-end gap-2'>
                <button className='hover:bg-blue-600 hover:text-white transiton-all duration-300 text-sm text-stone-500 text-center sm:min-2-48 py-2 border rounded'>Pay Online</button>
                <button className='hover:bg-primary hover:text-white transiton-all duration-300 text-sm text-stone-500 text-center sm:min-2-48 py-2 border rounded'>Cancel Appointment</button>
              </div>
            </div>
          ))
        }
>>>>>>> ba0caae0553f789aeeea36ce12a0a77d6aa62e5a
      </div>
    </div>
  )
}

export default MyAppointments