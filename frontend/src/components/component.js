import React from 'react'

import PropTypes from 'prop-types'

import './component.css'

const AppComponent = (props) => {
  return (
    <div className="component-container">
      <button className="component-button button ButtonSmall">
        {props.button}
      </button>
    </div>
  )
}

AppComponent.defaultProps = {
  button: 'Get Started',
}

AppComponent.propTypes = {
  button: PropTypes.string,
}

export default AppComponent
