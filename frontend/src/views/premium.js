import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../components/header'
import FooterGray from '../components/footer-gray'
import './premium.css'

const Premium = (props) => {
  return (
    <div className="premium-container">
      <Helmet>
        <title>Premium - Soft UI Pro</title>
        <meta property="og:title" content="Premium - Soft UI Pro" />
      </Helmet>
      <Link to="/" className="premium-navlink">
        <Header className="premium-component"></Header>
      </Link>
      <div className="premium-container1">
        <div className="premium-main">
          <div className="premium-grid"></div>
          <div className="premium-pricing">
            <div className="premium-container2">
              <div className="premium-container3">
                <h1>Pricing Plans</h1>
                <span className="premium-text01">
                  We offer following plans:
                </span>
              </div>
              <div className="premium-container4">
                <div className="premium-container5">
                  <span className="premium-text02">Free</span>
                  <span className="premium-text03">$0</span>
                  <span className="premium-text04">5 Questions</span>
                  <span className="premium-text05">2 Framework</span>
                  <span className="premium-text06">
                    1
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span className="premium-text07">
                    No user profile and stats
                  </span>
                  <Link to="/signup" className="premium-navlink1 button">
                    SIGN UP
                  </Link>
                </div>
                <div className="premium-container6">
                  <span className="premium-text08">Premium</span>
                  <span className="premium-text09">$29</span>
                  <span className="premium-text10">
                    <span className="premium-text11">All</span>
                    <span> Premium Questions</span>
                  </span>
                  <span className="premium-text13">
                    <span className="premium-text14">All</span>
                    <span> Framework</span>
                  </span>
                  <span className="premium-text16">User Profile and stats</span>
                  <span className="premium-text17">
                    Access to Premium Content
                  </span>
                  <button className="premium-button button">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterGray></FooterGray>
    </div>
  )
}

export default Premium
