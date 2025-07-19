import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { useContext} from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  const {userData, setUserData, token ,backendUrl, loadUserProfileData}=useContext(AppContext)
  //   name:"Edward Vincent",
  //   image: assets.profile_pic,
  //   email: 'richardjames@gmail.com',
  //   phone: '+1 123 456 789',
  //   address:{
  //     line1: "57th cross, Richmond",
  //     line2:"Circle, Church Road, London"
  //   },
  //   gender:'Male',
  //   dob:'2000-01-20'
  // })

  const [isEdit, setIsEdit] = useState(false)
  const [image,setImage]= useState(false)

  const updateUserProfileData= async()=>{
    try {
      const formData= new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender', userData.gender || 'Male');

      //formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image)
      console.log("Token:", token);
      const {data}=await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})

      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6 text-base border border-gray-100">
      <div className="flex flex-col items-center gap-2">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer group">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md group-hover:opacity-80 transition"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            <div className="absolute bottom-2 right-2 bg-primary-light p-2 rounded-full shadow-lg">
              <img className="w-6 h-6" src={assets.upload_icon} alt="Upload" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        ) : (
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md"
            src={userData.image}
            alt="Profile"
          />
        )}
        {isEdit ? (
          <input
            className="bg-gray-50 text-2xl font-semibold text-center max-w-xs mt-2 rounded-md border border-gray-200 px-2 py-1 focus:outline-primary"
            type="text"
            value={userData.name}
            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="font-semibold text-2xl text-neutral-800 mt-2 text-center">{userData.name}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-gray-100">
          <p className="text-primary font-bold text-sm mb-2 tracking-wide">Contact Information</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium w-20">Email:</span>
              <span className="text-blue-500 break-all">{userData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium w-20">Phone:</span>
              {isEdit ? (
                <input
                  className="bg-white border border-gray-200 rounded px-2 py-1 max-w-[140px] focus:outline-primary"
                  type="text"
                  value={userData.phone}
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                />
              ) : (
                <span className="text-blue-400">{userData.phone}</span>
              )}
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium w-20">Address:</span>
              {isEdit ? (
                <div className="flex flex-col gap-1">
                  <input
                    className="bg-white border border-gray-200 rounded px-2 py-1 mb-1 focus:outline-primary"
                    onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    value={userData.address.line1}
                    type="text"
                    placeholder="Line 1"
                  />
                  <input
                    className="bg-white border border-gray-200 rounded px-2 py-1 focus:outline-primary"
                    onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    value={userData.address.line2}
                    type="text"
                    placeholder="Line 2"
                  />
                </div>
              ) : (
                <span className="text-gray-500">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-gray-100">
          <p className="text-primary font-bold text-sm mb-2 tracking-wide">Basic Information</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium w-20">Gender:</span>
              {isEdit ? (
                <select
                  className="bg-white border border-gray-200 rounded px-2 py-1 max-w-[90px] focus:outline-primary"
                  onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <span className="text-gray-400">{userData.gender}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium w-20">Birthday:</span>
              {isEdit ? (
                <input
                  className="bg-white border border-gray-200 rounded px-2 py-1 max-w-[120px] focus:outline-primary"
                  type="date"
                  onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  value={userData.dob}
                />
              ) : (
                <span className="text-gray-400">{userData.dob}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        {isEdit ? (
          <button
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-2 rounded-full shadow transition-all duration-200 border border-primary"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="bg-white hover:bg-primary hover:text-white text-primary font-semibold px-8 py-2 rounded-full shadow border border-primary transition-all duration-200"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile