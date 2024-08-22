import React from 'react'

import PropTypes from 'prop-types'

import './primary-pink-button.css'

const PrimaryPinkButton = (props) => {
  return (
    <div className="primary-pink-button-container">
      <div className="primary-pink-button-container1">
        <button className="primary-pink-button-button button ButtonSmall">
          {props.button}
        </button>
      </div>
    </div>
  )
}

PrimaryPinkButton.defaultProps = {
  button: 'Premium',
}

PrimaryPinkButton.propTypes = {
  button: PropTypes.string,
}

export default PrimaryPinkButton
