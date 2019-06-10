import React from 'react'
import ReactDOM from 'react-dom'

import { addReduxSwarmLog, configureReduxSwarmLog } from './redux-swarmlog'
import keys from './keys.json'

import { Provider } from 'react-redux'
import { store } from './redux/store'

configureReduxSwarmLog({ reduxStore: store })
addReduxSwarmLog({ name: 'todos', keys })

import App from './components/App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
