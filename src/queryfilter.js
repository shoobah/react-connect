import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { doSearch, setFilter } from './data/actionCreators'

class QueryFilter extends React.Component {
  constructor( props) {
    super(props)
  }

  render() {
    return (
    <div style={this.props.style}>
      <input type="radio" name="type" defaultChecked={true} onChange={this.props.handler.bind(this)}/> Alla<br/>
      <input type="radio" name="type" onChange={this.props.handler.bind(this, 'Page', [])}/> Sida<br/>
      <input type="radio" name="type" onChange={this.props.handler.bind(this, 'Document', ['pdf'])}/> Pdf<br/>
      <input type="radio" name="type" onChange={this.props.handler.bind(this, 'Document', ['doc', 'docx'])}/> Word<br/>
      <input type="radio" name="type" onChange={this.props.handler.bind(this, 'Document', ['ppt', 'pptx'])}/> Powerpoint<br/>
      <input type="radio" name="type" onChange={this.props.handler.bind(this, 'File', ['jpg', 'png', 'gif'])}/> Bild<br/>
      <input type="radio" name="type" onChange={this.props.handler.bind(this, 'File', ['mp4', 'mov', 'mkv'])}/> Film<br/>
    </div>
    )
  }
}

export default QueryFilter
