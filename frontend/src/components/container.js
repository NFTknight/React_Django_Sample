import React from 'react'

import PropTypes from 'prop-types'

import './container.css'

const Container = (props) => {
  return (
    <div className="container-container">
      <span>{props.text}</span>
      <div>
        <div>
          <div>
            <span>{props.text1}</span>
          </div>
          <div>
            <span>{props.text2}</span>
          </div>
          <div>
            <span>{props.text3}</span>
          </div>
        </div>
        <div>
          <div>
            <span>{props.text4}</span>
          </div>
          <div>
            <span>{props.text5}</span>
          </div>
          <div>
            <span>{props.text6}</span>
          </div>
        </div>
        <div>
          <div>
            <span>{props.text7}</span>
          </div>
          <div>
            <span>{props.text8}</span>
          </div>
          <div>
            <span>{props.text9}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

Container.defaultProps = {
  text9: '25',
  text: ' /* Table Styles */\n    .table {\n      display: flex;\n      flex-direction: column;\n      border: 1px solid #ccc;\n      border-collapse: collapse;\n    }\n\n    .table-header,\n    .table-row {\n      display: flex;\n    }\n\n    .table-header {\n      font-weight: bold;\n      background-color: #f2f2f2;\n    }\n\n    .table-cell {\n      flex: 1;\n      padding: 8px;\n      border: 1px solid #ccc;\n    } ',
  text4: '1',
  text1: 'ID',
  text5: 'John Doe',
  text8: 'Jane Smith',
  text3: 'Age',
  text7: '2',
  text2: 'Name',
  text6: '30',
}

Container.propTypes = {
  text9: PropTypes.string,
  text: PropTypes.string,
  text4: PropTypes.string,
  text1: PropTypes.string,
  text5: PropTypes.string,
  text8: PropTypes.string,
  text3: PropTypes.string,
  text7: PropTypes.string,
  text2: PropTypes.string,
  text6: PropTypes.string,
}

export default Container
