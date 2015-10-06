import React, { PropTypes } from 'react'

class Age extends React.Component {
  render () {
    return (
      <div style={{paddingTop:'20px'}}>
        <input type="radio" name="age" defaultChecked={true} onChange={this.props.handler.bind(this)}/> När som helst<br/>
        <input type="radio" name="age" onChange={this.props.handler.bind(this, 'week')}/> Senaste veckan<br/>
        <input type="radio" name="age" onChange={this.props.handler.bind(this, 'month')}/> Senaste månaden<br/>
        <input type="radio" name="age" onChange={this.props.handler.bind(this, 'year')}/> Senaster året<br/>
      </div>
    )
  }
}

export default Age;
