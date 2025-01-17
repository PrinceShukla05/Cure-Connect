import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ' >

            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores dignissimos repellendus, rem aspernatur accusamus sapiente ab ut voluptate ipsam, reiciendis officiis suscipit ipsa unde molestias cum iusto dolorem facere.</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li onClick={()=>{navigate('/'); scrollTo(0, 0)}} className='cursor-pointer'>Home</li>
                    <li onClick={()=>{navigate('/about'); scrollTo(0, 0)}} className='cursor-pointer'>About us</li>
                    <li onClick={()=>{navigate('/contact'); scrollTo(0, 0)}} className='cursor-pointer'>Contact us</li>
                    <li onClick={()=>{navigate('/about'); scrollTo(0, 0)}} className='cursor-pointer'>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>1234567890</li>
                    <li>random@gmail.com</li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ Cure-Connect - All Rights Reserved.</p>
        </div>

    </div>
  )
}

export default Footer