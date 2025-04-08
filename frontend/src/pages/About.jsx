import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='border border-red-600 w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Cure Connect simplifies healthcare by connecting patients with trusted doctors and specialists. Schedule appointments, manage health records, and access care—all in one platform.</p>
          <p>Designed for convenience and reliability, Cure Connect ensures seamless communication between patients and providers, making healthcare accessible, transparent, and personalized.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our mission is to empower individuals to take control of their health through a user-friendly system that fosters trust, care, and efficient medical services.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>

      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 fleex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 '>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy life.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 fleex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 '>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 fleex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 '>
          <b>Personalization</b>
          <p>Tailored recommendations and remainders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About