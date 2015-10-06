import fetch from 'isomorphic-fetch'
import Config from 'config'

// Dispatch when search is set to begin.
export const SEARCHSTART = 'SEARCHSTART'
function requestSearch (query) {
  return {
    type: SEARCHSTART,
    message: 'Started search',
  query}
}

export const SEARCHSUCCESS = 'SEARCHSUCCESS'
// Dispatch this when request returns
export function searchSuccess (json, query) {
  return {
    type: SEARCHSUCCESS,
    response: json,
    query: query,
    message: 'Found stuff'
  }
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const SEARCHFAILED = 'SEARCHFAILED'
function searchFailed (error) {
  return {
    type: SEARCHFAILED,
    message: error
  }
}

export function doSearch (query) {
  return (dispatch) => {
    dispatch(requestSearch(query))
    return fetch(Config.searchUrl, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(searchSuccess(json, query)))
      .catch(error => dispatch(searchFailed(error)))
  }
}
