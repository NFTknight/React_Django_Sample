import React from 'react'

import PropTypes from 'prop-types'

import './outline-black-button.css'

const OutlineBlackButton = (props) => {
  return (
    <div className="outline-black-button-container">
      <button className="outline-black-button-button button ButtonSmall">
        {props.button}
      </button>
    </div>
  )
}

OutlineBlackButton.defaultProps = {
  button: 'Button',
}

OutlineBlackButton.propTypes = {
  button: PropTypes.string,
}

export default OutlineBlackButton
