import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.css'
import { Router } from 'react-router-dom'
import { createStore } from './app/store/createStore'
import { Provider } from 'react-redux'
import history from './app/utils/history'

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
)

reportWebVitals()
