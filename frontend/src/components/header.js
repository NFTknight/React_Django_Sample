import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../views/authContext'
import PropTypes from 'prop-types'

import PrimaryPinkButton from './primary-pink-button'
import './header.css'

const Header = (props) => {
  
  // const [currentUser, setCurrentUser] = useContext(AuthContext);
  return (
    <div data-role="Header" className="header-header">
      <nav className="header-nav">
        <div className="header-container">
          <img
            alt={props.image_alt1}
            src={props.image_src1}
            className="header-image"
          />
          <div className="header-menu">
            <Link to="/" className="header-navlink">
              Home
            </Link>
            <Link to="/user-profile" className="header-navlink1">
              DE Roadmap
            </Link>
            <Link to="/problem-set" className="home-navlink02">
                Problems
            </Link>
            {/* <span className="header-text"></span> */}
          </div>
          <div className="header-container1">
            <div className="header-container2">
              <PrimaryPinkButton button="Subscribe now"></PrimaryPinkButton>
            </div>
            <div data-role="BurgerMenu" className="header-burger-menu">
              <svg viewBox="0 0 1024 1024" className="header-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
          </div>
        </div>
      </nav>
      <div data-role="MobileMenu" className="header-mobile-menu">
        <div className="header-top">
          <Link to="/" className="header-navlink2 Large">
            Soft UI Design System
          </Link>
          <div data-role="CloseMobileMenu" className="header-close-menu">
            <svg viewBox="0 0 1024 1024" className="header-icon2">
              <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
            </svg>
          </div>
        </div>
        <div className="header-mid">
          <div className="header-menu1">
            <Link to="/" className="header-navlink3 Large">
              Home
            </Link>
            <Link to="/user-profile" className="header-navlink4 Large">
              Profile
            </Link>
            <Link to="/premium" className="header-navlink5 Large">
              Coming Soon
            </Link>
          </div>
        </div>
        <div className="header-bot">
          <PrimaryPinkButton button="buy now"></PrimaryPinkButton>
        </div>
      </div>
    </div>
  )
}

Header.defaultProps = {
  image_src1: '/logo-min-200h.png',
  image_alt: 'image',
  image_alt1: 'image',
  image_src:
    'https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/logos/gray-logos/logo-pinterest.svg',
}

Header.propTypes = {
  image_src1: PropTypes.string,
  image_alt: PropTypes.string,
  image_alt1: PropTypes.string,
  image_src: PropTypes.string,
}

export default Header
