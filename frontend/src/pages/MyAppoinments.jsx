import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

function MyAppoinments() {
  const {backendUrl,token,getDoctorsData} =useContext(AppContext);
  
  const[appointments,setAppointments]=useState([])

  const months= ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
  const slotDateFormate = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0]+ " " + months[Number(dateArray[1])] + " " + dateArray[2]

  }

  const getUserAppointments = async(req,res) =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appoinments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

  const cancelAppointment =async(appointmentId)=>{
    try {

      const {data}= await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
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
  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {
          appointments.map((item,index)=>(
            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
             <div>
              <img src={item.docData.image} className='w-32 bg-indigo-50'/>
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='font-medium text-zinc-700 mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'> Date & Time:</span> {slotDateFormate(item.slotDate)} | {item.slotTime}</p>


              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && <button className='hover:bg-primary hover:text-white transition-all duration-300 text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-md'>Pay Online</button>}
                {!item.cancelled && <button onClick={()=> cancelAppointment(item._id)} className='hover:bg-red-600 hover:text-white transition-all duration-300 text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-md'>Cancel Appointment</button>}
                {item.cancelled && <button className='sm:min-w-48  py-2 border border-red-500 text-red-500 rounded'>Appointment cancel</button>}



                </div>
                

            </div>

          ))}
      </div>
    </div>
  )
}

export default MyAppoinments
