import React, { PropTypes } from 'react'
import Moment from 'moment'
import Config from 'config'

Moment.locale('sv')

function getDates (hit) {
  let cr = Moment(hit.UpdateDate)
  let ch = Moment(hit.PublishDate)
  let df = Moment().diff(cr, 'days')
  return {
    changed: cr,
    created: ch,
    diff: df
  }
}

let myDateFormat = 'YYYY-MM-DD HH:mm'

const commonStyle = {
  paddingTop: '5px',
  paddingBottom: '5px',
  borderTop: 'solid 1px #000',
  height:'139px',
  overflow: 'hidden',
  backgroundColor: 'white'
}

const titleStyle = {
  fontWeight: '700',
  textTransform: 'capitalize'
}

export default class extends React.Component {
  renderDates(style) {
    var dates = getDates(this.props.hit)
    return (
    <div style={style}>
      <span>Publicerad: {dates.created.format(myDateFormat)}</span><br/>
      <span>Uppdaterad: {dates.changed.format(myDateFormat)}</span><br/>
      <span>{dates.diff} dagar sedan senaste ändring</span><br/>
    </div>
    )
  }

  renderDefault( hit) {
    return (
      <div style={commonStyle} data-type={hit.TypeName}>
        <span style={titleStyle} dangerouslySetInnerHTML={{__html: hit.Title}}></span><br/>
          {this.renderDates()}
      </div>
    )
  }

  renderPageHit( hit) {
    return (
    <div style={commonStyle} data-type={hit.TypeName}>
      <a style={titleStyle} href={Config.pathPrefix + hit.Url} dangerouslySetInnerHTML={{__html: hit.Title}}></a><br/>
      {this.renderDates()}
    </div>
    )
  }

  renderImageHit( hit) {
    return (
    <div style={commonStyle} data-type={hit.TypeName}>
      <div style={{position:'absolute', right:'0'}}>
        <a href={Config.pathPrefix + hit.Url}>
          <img srcSet={Config.pathPrefix + hit.Url} style={{height: '100px'}} />
        </a>
      </div>
    {this.renderDates({})}
    </div>
    )
  }

  renderDocHit( hit) {
    return (
    <div style={commonStyle} data-type={hit.TypeName}>
      <a style={titleStyle} href={Config.pathPrefix + hit.Url} dangerouslySetInnerHTML={{__html: hit.Title}}></a><br/>
      {this.renderDates()}
    </div>
    )
  }

  render() {
    var hit = this.props.hit
    switch (hit.TypeName) {
      case 'Document':
        return this.renderDocHit(hit)
        break
      case 'File':
        return this.renderImageHit(hit)
        break
      case 'Page':
        return this.renderPageHit(hit)
        break
      default:
        return this.renderDefault(hit)
        break
    }
  }
}
