import React from 'react'
import 'babel-core/polyfill' // Får Object.assign att lira i applikationen
import HitList from './hitlist'
import SearchInput from './searchinput'
import { doSearch } from './data/actionCreators'
import { connect } from 'react-redux'
import Moment from 'moment'

Moment.locale('sv')

class App extends React.Component {
  constructor( props) {
    super(props)
  }

  isNumeric( n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(App)
