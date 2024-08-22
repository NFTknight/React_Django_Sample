import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../components/header'
import SecondaryButton from '../components/secondary-button'
import FooterGray from '../components/footer-gray'
import './about-us.css'

const AboutUs = (props) => {
  return (
    <div className="about-us-container">
      <Helmet>
        <title>AboutUs - Soft UI Pro</title>
        <meta property="og:title" content="AboutUs - Soft UI Pro" />
      </Helmet>
      <Link to="/" className="about-us-navlink">
        <Header className="about-us-component"></Header>
      </Link>
      <div className="about-us-container1">
        <div className="about-us-main">
          <div className="about-us-container2">
            <h1 className="about-us-text HeadingOne">You Work With</h1>
            <h1 className="about-us-text1">Soft Design System</h1>
            <p className="about-us-text2 Lead">
              <span className="about-us-text3">
                The time is now for it be okay to be great. Subscribe now and
                get notified when it&apos;s launched!
              </span>
            </p>
            <div className="about-us-container3">
              <input
                type="text"
                placeholder="Email here"
                className="about-us-textinput Small input"
              />
              <SecondaryButton button="Subscribe"></SecondaryButton>
            </div>
          </div>
          <div className="about-us-grid">
            <img
              alt="image"
              src="/iphone-3-1000w.png"
              className="about-us-image"
            />
            <img
              alt="image"
              src="/iphone-2-1000w.png"
              className="about-us-image01"
            />
            <img
              alt="image"
              src="/iphone-4-1000w.png"
              className="about-us-image02"
            />
            <img
              alt="image"
              src="/iphone-1-1000w.png"
              className="about-us-image03"
            />
            <img
              alt="image"
              src="/iphone-2-1000w.png"
              className="about-us-image04"
            />
            <img
              alt="image"
              src="/iphone-4-1000w.png"
              className="about-us-image05"
            />
            <img
              alt="image"
              src="/iphone-1-1000w.png"
              className="about-us-image06"
            />
            <img
              alt="image"
              src="/iphone-3-1000w.png"
              className="about-us-image07"
            />
            <img
              alt="image"
              src="/iphone-2-1000w.png"
              className="about-us-image08"
            />
            <img
              alt="image"
              src="/iphone-4-1000w.png"
              className="about-us-image09"
            />
            <img
              alt="image"
              src="/iphone-1-1000w.png"
              className="about-us-image10"
            />
            <img
              alt="image"
              src="/iphone-3-1000w.png"
              className="about-us-image11"
            />
            <img
              alt="image"
              src="/iphone-4-1000w.png"
              className="about-us-image12"
            />
            <img
              alt="image"
              src="/iphone-1-1000w.png"
              className="about-us-image13"
            />
            <img
              alt="image"
              src="/iphone-3-1000w.png"
              className="about-us-image14"
            />
            <img
              alt="image"
              src="/iphone-2-1000w.png"
              className="about-us-image15"
            />
          </div>
        </div>
      </div>
      <FooterGray></FooterGray>
    </div>
  )
}

export default AboutUs
