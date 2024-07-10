import React from 'react';
import NavbarAd from './components/Navbar/NavbarAd';
import SidebarAd from './components/Sidebar/SidebarAd';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <NavbarAd/>
      <hr/>
      <div className='app-content'>
        <SidebarAd/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Orders url={url}/>}/> 
        </Routes>
      </div>
    </div>
  )
}

export default App
