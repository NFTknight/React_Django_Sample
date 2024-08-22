import React from 'react'

import PropTypes from 'prop-types'

import './outline-blue-button.css'

const OutlineBlueButton = (props) => {
  return (
    <div className="outline-blue-button-container">
      <button className="outline-blue-button-button button ButtonSmall">
        {props.button}
      </button>
    </div>
  )
}

OutlineBlueButton.defaultProps = {
  button: 'Button',
}

OutlineBlueButton.propTypes = {
  button: PropTypes.string,
}

export default OutlineBlueButton
