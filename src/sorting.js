import React from 'react'

class Sorting extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    let dateOrderStyle = {}
    let relOrderStyle = {}
    if(this.props.isDateOrder){
      dateOrderStyle = {
        fontWeight:'bold'
      }
      relOrderStyle = {
        fontWeight:'normal'
      }
    } else {
      dateOrderStyle = {
        fontWeight:'normal'
      }
      relOrderStyle = {
        fontWeight:'bold'
      }
    }
    return(
    <div style={{paddingBottom:'5px'}}>
      <input type="button" style={relOrderStyle} value="Relevans" onClick={this.props.handleSort.bind(this, '')} />
      <input type="button" style={dateOrderStyle} value="Datum" onClick={this.props.handleSort.bind(this, 'date')} />
    </div>
  )
  }
}

export default Sorting;
