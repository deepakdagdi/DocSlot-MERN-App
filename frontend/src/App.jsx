import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './componets/Navbar';
import Footer from './componets/Footer';
import Login from './pages/Login';
import Doctors from './pages/Doctors';
import MyProfile from './pages/MyProfile';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
      <Route path='/about' element={<About/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:speciality' element={<Doctors/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/my-profile' element={<MyProfile/>}/>



      </Routes>
      <Footer/>
         </div>

  )
}

export default App
