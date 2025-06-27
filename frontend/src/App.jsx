
import Navbar from './componets/Navbar';
import Footer from './componets/Footer';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from 'react-router-dom';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>

      </Routes>
      <Footer/>
         </div>

  )
}

export default App
