import React, { PropTypes } from 'react'
import PageInfo from './pageinfo'
import { connect } from 'react-redux'
import { spring,TransitionMotion } from 'react-motion'

class HitList extends React.Component {
  constructor( props) {
    super(props)
  }

  getDefaultValue(){
    const hits = this.props.appState.hits;
    let n=0
    return hits.reduce((configs, obj) => {
        configs[obj.Id] = {
          height: spring(0),
          opacity: spring(1),
          data: hits[n]
        }
        n+=1
        return configs
      }, {})
  }

  getEndValue(){
    const hits = this.props.appState.hits;
    let n=0
    return hits.reduce((configs, obj) => {
        configs[obj.Id] = {
          height: spring(120,[120,17]),
          opacity: spring(1,[120,17]),
          data: hits[n]
        }
        n+=1
        return configs
      }, {})
  }

  willEnter(id){
    let ret = {
      height: spring(0),
      opacity: spring(1),
      data: this.props.appState.hits.find(item => {
        return item.Id === id
      })
    }
    return ret
  }

  willLeave(id, styleThatJustLeft){
    return{
      height: spring(0),
      opacity: spring(0),
      data: styleThatJustLeft.data
    }
  }

  render() {
    if (this.props.appState.failed === true) {
      return (
      <div style={{backgroundColor: 'red'}}>
          <h1>Kunde inte söka!</h1>
          <span>{this.props.appState.message.message}</span>
        </div>
      )
    }

    let order = 'relevans'
    if(this.props.appState.query.Order === 'date'){
      order = 'datum'
    }

    let hits = this.props.appState.hits
    if (hits) {
      if(hits.length === 0){
        let nohitStyle={
          border: '1px solid #bdbdbd',
          backgroundColor: '#ffffe0'
        }
        return(
          <div className="col-sm-9" style={nohitStyle}>
            Din sökning gav inga träffar. Om du har gjort en avgränsning av sökningen, prova att ta bort den. Du kan också prova att ta bort sökord (om du har skrivit flera) eller formulera om sökfrågan.
          </div>
        )
      } else {
        let total = this.props.appState.total
        let from = this.props.appState.query.Skip
        let to = this.props.appState.query.Skip + this.props.appState.query.Take
        if(to > total){
          to = total
        }
        return (
        <div className="col-sm-9">
          <h2>Visar {from} till {to} av {total} träffar sorterade på {order}</h2>
          <TransitionMotion
            defaultStyles={this.getDefaultValue()}
            styles={this.getEndValue()}
            willLeave={this.willLeave.bind(this)}
            willEnter={this.willEnter.bind(this)}>
            {configs =>
            <ul style={{listStyle:'none', padding:'0'}}>
              {Object.keys(configs).map(id => {
                const config = configs[id]
                const {data: data, ...style} = config
                return (
                <li key={id} style={style}>
                    <PageInfo hit={data} />
                </li>
                )
              })
              }
            </ul>
            }
          </TransitionMotion>
        </div>
      )
    }
  }
}
}

export default HitList
