import React from 'react'

import './footer.css'

const Footer = (props) => {
  return (
    <footer className="footer-footer">
      <div className="footer-container">
        <div className="footer-container1">
          <span className="footer-text">SOFT</span>
          <span>Copyright © 2023 by DECode Team.</span>
        </div>
        <div className="footer-container2">
          <div className="footer-container3">
            <span className="footer-text02 Large">Company</span>
            <span className="footer-text03 Large">About Us</span>
            <span className="footer-text04 Large">Careers</span>
            <span className="footer-text05 Large">Press</span>
          </div>
          <div className="footer-container4">
            <span className="footer-text06 Large">Pages</span>
            <span className="footer-text07 Large">Login</span>
            <span className="footer-text08 Large">Register</span>
            <span className="footer-text09 Large">About</span>
          </div>
          <div className="footer-container5">
            <span className="footer-text10 Large">Products</span>
            <span className="footer-text11 Large">Free</span>
            <span className="footer-text12 Large">PRO</span>
            <span className="footer-text13 Large">Latest</span>
          </div>
        </div>
      </div>
      <img alt="image" src="/waves-white.svg" className="footer-image" />
    </footer>
  )
}

export default Footer
