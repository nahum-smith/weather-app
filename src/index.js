import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'

const configuredStore = configureStore()

ReactDOM.render((
  <Provider store={configuredStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>), document.getElementById('root'))
registerServiceWorker()
