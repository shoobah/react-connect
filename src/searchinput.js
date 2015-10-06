import React, { PropTypes } from 'react'
import store from './data/findstore'
import { doSearch, setQuery, pageForward, pageBackward } from './data/actionCreators'
import QueryFilter from './queryfilter'
import { connect } from 'react-redux'
import waitGif from './images/please-wait.gif'
import Sorting from './sorting'
import Age from './age'

class SearchInput extends React.Component {
  constructor( props) {
    super(props)
  }

  renderWaiting(){
    if (this.props.isFetching) {
      return (
        <div style={{position:'absolute', left:'200px'}}>
          <img src={waitGif} />
        </div>
      )
    }
  }

  render() {
    let dateOrderStyle = {}
    let relOrderStyle = {}
    let isDateOrder = this.props.query.Order === 'date'

    return (
    <div className="col-sm-3">
      <input type="text" style={{width:'100%'}} value={this.props.query.Text} onChange={this.props.handleText.bind(this)} onKeyDown={this.props.handleEnterKey.bind(this)}/>
      <div style={{width:'100%'}}>
        <input type="button" style={{float:'right'}} value="Sök" onClick={this.props.handleFindClick.bind(this)} />
      </div>
      <div style={{clear:'both', paddingBottom:'5px'}}>
        Visa:
        <input
          style        = {{width: '50px'}}
          type         = "text"
          onChange     = {this.props.handleNumberInput.bind(this)}
          onKeyDown    = {this.props.handleEnterKey.bind(this)}
          defaultValue = {this.props.query.Take}
        />
        st
      </div>
      <Sorting isDateOrder={isDateOrder} handleSort={this.props.handleSort.bind(this)} />
      {this.renderWaiting()}
      <input type="button" value="Föregående" onClick={this.props.handleBackward.bind(this)}/>
      <input type="button" style={relOrderStyle} value="Nästa" onClick={this.props.handleForward.bind(this)}/>
      <QueryFilter handler={this.props.handleFilterChange.bind(this)}/>
      <Age handler={this.props.handleAgeChange.bind(this)}/>
    </div>
    )
  }
}

export default SearchInput
