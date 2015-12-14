import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Order from './containers/Order'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <Order />
  </Provider>,
  document.getElementById('countryOrder')
)


