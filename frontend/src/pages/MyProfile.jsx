import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name:"Edward Vincent",
    image: assets.profile_pic,
    email: 'richardjames@gmail.com',
    phone: '+1 123 456 789',
    addfress:{
      line1: "57th cross, Richmond",
      line2:"Circle, Church Road, London"
    },
    gender:'Male',
    dob:'2000-01-2'
    
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div>

      <img src={userData.image} alt="" />

      {
        isEdit? <input type='text' onChange={e => setUserData(prev => ({...prev, name:e.target.value}))} />
        : <div></div>
}


    </div>
  )
}

export default MyProfile