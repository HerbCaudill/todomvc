import React from 'react'
import ReactDOM from 'react-dom'

// import { addReduxSwarmLog } from '@philholden/redux-swarmlog'
// import keys from './keys.json'

// addReduxSwarmLog({ name: 'todos', keys })

import { Provider } from 'react-redux'
import { store } from './redux/store'

import App from './components/App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
