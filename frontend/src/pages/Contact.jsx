import React from 'react'
import { assets } from '../assets/assets'

function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} />

        <div className='flex flex-col justify-scenter items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600' >Our OFFICE</p>
          <p className='text-gray-500'>Sector 7 Estate,<br />
            near Tube Station Exit 3,<br />
            Ring Road (A406), North London,<br />
            London, NW10 1AB,<br/>
            United Kingdom
          </p>

          <p className='text-gray-500'>Tel:(415) 343-4343<br /> Email: deepakdagdi@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at DocSlot</p>
          <p className='text-gray-500'>Learn more about our team and job openings</p>
          <button className='border border-black  px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded-xl'>Explor Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact


