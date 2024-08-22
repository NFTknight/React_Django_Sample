import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../components/header'
import SecondaryButton from '../components/secondary-button'
import FooterGray from '../components/footer-gray'
import './resources.css'

const Resources = (props) => {
  return (
    <div className="resources-container">
      <Helmet>
        <title>Resources - Soft UI Pro</title>
        <meta property="og:title" content="Resources - Soft UI Pro" />
      </Helmet>
      <Link to="/" className="resources-navlink">
        <Header className="resources-component"></Header>
      </Link>
      <div className="resources-container1">
        <div className="resources-main">
          <div className="resources-container2">
            <h1 className="resources-text HeadingOne">You Work With</h1>
            <h1 className="resources-text1">Soft Design System</h1>
            <p className="resources-text2 Lead">
              <span className="resources-text3">
                The time is now for it be okay to be great. Subscribe now and
                get notified when it&apos;s launched!
              </span>
            </p>
            <div className="resources-container3">
              <input
                type="text"
                placeholder="Email here"
                className="resources-textinput Small input"
              />
              <SecondaryButton button="Subscribe"></SecondaryButton>
            </div>
          </div>
          <div className="resources-grid">
            <img
              alt="image"
              src="/iphone-3-1000w.png"
              className="resources-image"
            />
            <img
              alt="image"
              src="/iphone-2-1000w.png"
              className="resources-image01"
            />
            <img
              alt="image"
              src="/iphone-4-1000w.png"
              className="resources-image02"
            />
            <img
              alt="image"
              src="/iphone-1-1000w.png"
              className="resources-image03"
            />
            <img
              alt="image"
              src="/iphone-2-1000w.png"
              className="resources-image04"
            />
            <img
              alt="image"
              src="/iphone-4-1000w.png"
              className="resources-image05"
            />
            <img
              alt="image"
              src="/iphone-1-1000w.png"
              className="resources-image06"
            />
            <img
              alt="image"
              src="/iphone-3-1000w.png"
              className="resources-image07"
            />
            <img
              alt="image"
              src="/iphone-2-1000w.png"
              className="resources-image08"
            />
            <img
              alt="image"
              src="/iphone-4-1000w.png"
              className="resources-image09"
            />
            <img
              alt="image"
              src="/iphone-1-1000w.png"
              className="resources-image10"
            />
            <img
              alt="image"
              src="/iphone-3-1000w.png"
              className="resources-image11"
            />
            <img
              alt="image"
              src="/iphone-4-1000w.png"
              className="resources-image12"
            />
            <img
              alt="image"
              src="/iphone-1-1000w.png"
              className="resources-image13"
            />
            <img
              alt="image"
              src="/iphone-3-1000w.png"
              className="resources-image14"
            />
            <img
              alt="image"
              src="/iphone-2-1000w.png"
              className="resources-image15"
            />
          </div>
        </div>
      </div>
      <FooterGray></FooterGray>
    </div>
  )
}

export default Resources
