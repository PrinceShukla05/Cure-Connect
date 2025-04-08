<<<<<<< HEAD
import React from 'react'


/*
<div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-red-500'}`}>
  <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
</div>
*/
const RelatedDoctors = () => {
  return (
    <div>RelatedDoctors</div>
  )
}

=======
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({docId, speciality}) => {

    const {doctors} = useContext(AppContext)
    
    const navigate = useNavigate()

    const [relDoc, setRelDoc]  = useState([])

    useEffect(()=>{
        if(doctors.length > 0 && speciality){
          const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
          setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

  return (
    <div className='flex flex-col item-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl self-center font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 self-center text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full place-self-center grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {relDoc.slice(0, 5).map((item, index)=>(
                <div key={index} onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='self-center border border-red-400 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '>
                    <img className='bg-red-100 hover:bg-red-300 transition-all duration-300' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='self-center w-1/2 hover:text-white hover:bg-red-500 transition-all duration-200 bg-red-100 border border-red-400 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

>>>>>>> ba0caae0553f789aeeea36ce12a0a77d6aa62e5a
export default RelatedDoctors