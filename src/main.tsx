import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'

import {App} from './app'
import {store} from './store'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
