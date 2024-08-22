import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../views/authContext'
import PrimaryPinkButton from './primary-pink-button'
import './header-full.css'
import {UserGreeting} from '../userService/UserDropdown'


const HeaderFull = (props) => {
  return (
    <div className="header-full-header">
      <nav className="header-full-nav">
        <div className="header-full-container">
            <Link to="/" className="home-navlink">
              <img
                alt="image"
                src="/logo-min-200h.png"
                className="home-image"
              />
            </Link>
          <div className="header-full-menu">
            <Link to="/" className="header-full-navlink1 Large">
              Home
            </Link>
            <Link to="/userProfile" className="header-full-navlink2 Large">
              Profile
            </Link>
            <Link to="/problem-set" className="home-navlink02">
                Problems
            </Link>

          </div>
          <div>
  
          </div>
          <div className="header-full-menu">
            
            <div className="header-full-container2">
            <UserGreeting/>
            <Link to="/premium" className="home-navlink03 button">
              Buy Now
              </Link>
            </div>
            {/* <svg viewBox="0 0 1024 1024" className="header-full-icon">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg> */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderFull
