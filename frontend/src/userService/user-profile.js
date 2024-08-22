import React from 'react'

import { Helmet } from 'react-helmet'

import HeaderFull from '../components/header-full'
import OutlineBlueButton from '../components/outline-blue-button'
import NextButton from '../components/next-button'
import Footer from '../components/footer'
import './user-profile.css'

const UserProfile1 = (props) => {
  return (
    <div className="user-profile-container">
      <Helmet>
        <title>UserProfile - Soft UI Pro</title>
        <meta property="og:title" content="UserProfile - Soft UI Pro" />
      </Helmet>
      <HeaderFull></HeaderFull>
      <div className="user-profile-profile">
        <img
          alt="image"
          src="/bruce-mars-200h.jpg"
          className="user-profile-image"
        />
        <div className="user-profile-container1">
          <div className="user-profile-container2">
            <h4 className="user-profile-text">Michael Roven</h4>
            <OutlineBlueButton button="follow"></OutlineBlueButton>
          </div>
          <div className="user-profile-container3">
            <span className="user-profile-text01">
              <span className="user-profile-text02">323</span>
              <span> Posts</span>
            </span>
            <span className="user-profile-text04">
              <span className="user-profile-text05">3.5k</span>
              <span> Followers</span>
            </span>
            <span>
              <span className="user-profile-text08">260</span>
              <span> Following</span>
            </span>
          </div>
          <span className="Medium">
            Decisions: If you can’t decide, the answer is no. If two equally
            difficult paths, choose the one more painful in the short term (pain
            avoidance is creating an illusion of equality). Choose the path that
            leaves you more equanimous.
          </span>
          <NextButton button="More about me"></NextButton>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default UserProfile1
