import React from 'react'
import Home from "./pages/Home"
import  {Routes,Route} from "react-router-dom";
import About from './pages/About';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import Navbar from './componets/Navbar';
// import Admin from './pages/Admin';
import Appointment from './pages/Appointment';
import Footer from './componets/Footer';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:speciality' element={<Doctors/>}/>
       <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      {/* <Route path='/admin-dashbord' element={<Admin/>}/> */}
      <Route path='/my-profile' element={<MyProfile/>}/>
      <Route path='/appoinments/:docId' element={<Appointment/>}/>



      </Routes>
      <Footer/>
         </div>

  )
}

export default App
