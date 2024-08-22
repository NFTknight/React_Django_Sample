import React from 'react'

import PropTypes from 'prop-types'

import './component1.css'

const Component1 = (props) => {
  return (
    <div className="component1-container">
      <button className="component1-button button ButtonSmall">
        {props.button}
      </button>
    </div>
  )
}

Component1.defaultProps = {
  button: 'Create Account',
}

Component1.propTypes = {
  button: PropTypes.string,
}

export default Component1
