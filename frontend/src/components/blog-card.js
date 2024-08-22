import React from 'react'

import PropTypes from 'prop-types'

import NextButton from './next-button'
import './blog-card.css'

const BlogCard = (props) => {
  return (
    <div className="blog-card-container">
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="blog-card-image"
      />
      <h5 className="blog-card-text">{props.new_prop}</h5>
      <span>{props.description}</span>
      <NextButton button="Read more"></NextButton>
    </div>
  )
}

BlogCard.defaultProps = {
  image_alt: 'image',
  description:
    'Finding temporary housing for your dog should be as easy as renting an Airbnb. That’s the idea behind Rover',
  new_prop: 'Rover raised $65 million',
  image_src:
    'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/color-bags.jpg',
}

BlogCard.propTypes = {
  image_alt: PropTypes.string,
  description: PropTypes.string,
  new_prop: PropTypes.string,
  image_src: PropTypes.string,
}

export default BlogCard
