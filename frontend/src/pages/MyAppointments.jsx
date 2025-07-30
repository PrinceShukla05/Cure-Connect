import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const MyAppointments = () => {

  const { backendUrl,token, getDoctorsData } = useContext(AppContext)

  const [appointments,setAppointments]= useState([])
  const months=[" ","Jan", "Feb", "Mar","Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec" ]
  const navigate= useNavigate()


  const slotDateFormat= (slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserAppointments= async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment= async(appointmentId)=>{
    try {
      //console.log(appointmentId)
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      console.log(data)
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay=(order)=>{
    const options={
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount : order.amount,
        currency: order.currency,
        name:'Appointment payment',
        description:'appointment payment',
        order_id:order.id,
        receipt:order.receipt,
        handler: async(response)=>{
          console.log(response)
          try {
            const {data}=await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
            if(data.success){
              getUserAppointments()
              navigate('/my-appointments')
            }
          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
        }
    }
    const rzp= new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay= async (appointmentId)=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
      if(data.success){
        console.log(data.order)
        initPay(data.order)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // useEffect(()=>{
  //   if(appointments){
  //     console.log(appointments[0]._id)
  //   }
  // })

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-0">
      <p className="pb-3 mt-12 font-bold text-2xl text-primary border-b mb-8 text-center tracking-wide">My Appointments</p>
      <div className="flex flex-col gap-8">
        {appointments.length === 0 && (
          <div className="text-center text-gray-400 py-16 text-lg">No appointments found.</div>
        )}
        {appointments.map((item, index) => (
          <div
            key={index}
            className={
              `flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl shadow-lg border border-gray-100 bg-white relative transition hover:shadow-2xl` +
              (item.cancelled ? ' opacity-70' : '')
            }
          >
            <div className="flex-shrink-0">
              <img
                className="w-28 h-28 rounded-xl object-cover border-2 border-primary bg-gray-50 shadow"
                src={item.docData.image}
                alt={item.docData.name}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1 text-base text-zinc-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span className="text-lg font-semibold text-neutral-800">{item.docData.name}</span>
                <span className="text-primary font-medium">{item.docData.speciality}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-1">
                <span className="font-medium text-zinc-700">Address:</span>
                <span className="text-gray-500 text-sm">{item.docData.address.line1}</span>
                <span className="text-gray-500 text-sm">{item.docData.address.line2}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-1">
                <span className="font-medium text-zinc-700">Date & Time:</span>
                <span className="text-gray-700 text-sm">{slotDateFormat(item.slotDate)} | {item.slotTime}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-stretch min-w-[160px] mt-4 sm:mt-0">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <span className="py-2 rounded-full text-white bg-green-500 font-semibold text-center border border-green-500">Paid</span>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="py-2 rounded-full text-primary border border-primary font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="py-2 px-2 rounded-full text-red-400 border border-red-400 font-semibold hover:bg-red-400 hover:text-white transition-all duration-200 text-center"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <span className="py-2 px-2 rounded-full text-red-400 border border-red-500 font-semibold text-center bg-red-50">Appointment Cancelled</span>
              )}
              {item.isCompleted && (
                <span className="py-2 rounded-full text-green-600 border border-green-500 font-semibold text-center bg-green-50">Completed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments