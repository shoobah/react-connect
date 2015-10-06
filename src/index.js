import React from 'react';
import {Provider} from 'react-redux'
import App from './app';
import store from './data/findstore'

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
