import React from 'react';
import {assets} from '../../assets/assets'
import "./NavbarAd.css"

const NavbarAd = () => {
  return (
    <div className="navbar">
    <h2 className='admin'>Admin Panel</h2>
    <img className='profile'  src={assets.profile_image} alt="" />
    </div>
  )
}

export default NavbarAd
