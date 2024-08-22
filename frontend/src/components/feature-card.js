import React from 'react'

import PropTypes from 'prop-types'

import './feature-card.css'

const FeatureCard = (props) => {
  return (
    <div className="feature-card-container">
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="feature-card-image"
      />
      <h5 className="feature-card-text HeadingThree">{props.new_prop}</h5>
      <span className="feature-card-text1">{props.text}</span>
    </div>
  )
}

FeatureCard.defaultProps = {
  image_src: '/rocket1.svg',
  image_alt: 'image',
  text: 'Get the latest design ideas and turn it into reality.',
  new_prop: 'Apache Spark',
}

FeatureCard.propTypes = {
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  text: PropTypes.string,
  new_prop: PropTypes.string,
}

export default FeatureCard
