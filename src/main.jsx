import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context from './components/ContextProvider/Context';
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Context>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context>
  </React.StrictMode>,
)
