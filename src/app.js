import React from 'react'
import 'babel-core/polyfill' // Får Object.assign att lira i applikationen
import HitList from './hitlist'
import SearchInput from './searchinput'
import { doSearch } from './data/actionCreators'
import { connect } from 'react-redux'
import Moment from 'moment'

Moment.locale('sv')

function getQueryVariable (variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1])
    }
  }
  if (console) {
    console.error('Query variable %s not found', variable)
  }
}

class App extends React.Component {
  constructor( props) {
    super(props)
  }

  handleText( e) {
    let newQ = Object.assign(this.myQuery, {
      Text: e.target.value
    })
    this.forceUpdate()
  }

  handleEnterKey( e) {
    e.stopPropagation()
    if (e.which === 13) {
      let newQ = Object.assign({}, this.myQuery, {
        Skip: 0
      })
      this.updateQueryAndDoSearch(newQ)
      e.preventDefault()
    }
  }

  handleFindClick() {
    let newQ = Object.assign({}, this.myQuery, {
      Skip: 0
    })
    this.updateQueryAndDoSearch(newQ)
  }

  isNumeric( n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  handleNumberInput( e) {
    if (this.isNumeric(e.target.value) && e.target.value < 1001) {
      this.myQuery.Take = parseInt(e.target.value)
    }
  }

  handleForward() {
    if (this.myQuery.Skip + this.myQuery.Take < this.props.state.total) {
      let newQ = Object.assign({}, this.myQuery, {
        Skip: this.myQuery.Skip + this.myQuery.Take
      })
      this.updateQueryAndDoSearch(newQ)
    }
  }

  handleBackward() {
    if (this.myQuery.Skip - this.myQuery.Take >= 0) {
      let newQ = Object.assign({}, this.myQuery, {
        Skip: this.myQuery.Skip - this.myQuery.Take
      })
      this.updateQueryAndDoSearch(newQ)
    }
  }

  handleFilterChange( type, ext) {
    let newQ = Object.assign({}, this.myQuery, {
      Type: type,
      Extensions: ext,
      Skip: 0
    })
    this.updateQueryAndDoSearch(newQ)
  }

  handleAgeChange( age) {
    let minDate = Moment('1970-01-01')
    switch (age) {
      case 'week':
        minDate = Moment().add(-1, 'w')
        break
      case 'month':
        minDate = Moment().add(-1, 'M')
        break
      case 'year':
        minDate = Moment().add(-1, 'y')
        break
    }
    let myDateFormat = 'YYYY-MM-DD HH:mm'
    let newQ = Object.assign({}, this.myQuery, {
      MinDate: Moment(minDate).format(myDateFormat),
      Skip: 0
    })
    this.updateQueryAndDoSearch(newQ)
  }

  handleSort( on) {
    let newQ = Object.assign({}, this.myQuery, {
      Order: on
    })
    this.updateQueryAndDoSearch(newQ)
  }

  updateQueryAndDoSearch( queryObject) {
    let newQ = Object.assign({}, this.myQuery, queryObject)
    this.myQuery = newQ
    this.props.doSearch(newQ)
  }

  componentDidMount() {
    let extQueryText = getQueryVariable('quicksearchquery')
    this.myQuery = Object.assign({}, this.props.state.query)
    if (extQueryText) {
      var newQ = Object.assign({}, this.myQuery, {
        Text: extQueryText
      })
      this.updateQueryAndDoSearch(newQ)
    }
  }

  render() {
    let inputStyle = {
      backgroundColor: 'red',
      width:'234px',
      display:'inline-block',
      verticalAlign:'top'
    }
    let listStyle = {
      backgroundColor: 'lime',
      display:'inline-block',
      verticalAlign:'top',
      width:'400px'
    }
    return (
      <div className="container">
        <div className="row">
          <SearchInput
            handleText         = {this.handleText.bind(this)}
            handleEnterKey     = {this.handleEnterKey.bind(this)}
            handleNumberInput  = {this.handleNumberInput.bind(this)}
            handleBackward     = {this.handleBackward.bind(this)}
            handleForward      = {this.handleForward.bind(this)}
            handleFilterChange = {this.handleFilterChange.bind(this)}
            handleFindClick    = {this.handleFindClick.bind(this)}
            handleSort         = {this.handleSort.bind(this)}
            handleAgeChange    = {this.handleAgeChange.bind(this)}
            query              = {this.myQuery}
            isFetching         = {this.props.state.isFetching}
          />
        <HitList appState={this.props.state}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    state: state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    doSearch: (query) => dispatch(doSearch(query))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
