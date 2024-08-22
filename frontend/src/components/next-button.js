import React from 'react'

import PropTypes from 'prop-types'

import './next-button.css'

const NextButton = (props) => {
  return (
    <div className="next-button-container">
      <button className="next-button-button button">
        <span className="next-button-text">{props.button}</span>
        <svg viewBox="0 0 1024 1024" className="next-button-icon">
          <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
        </svg>
      </button>
    </div>
  )
}

NextButton.defaultProps = {
  button: 'Button',
}

NextButton.propTypes = {
  button: PropTypes.string,
}

export default NextButton
