import React from 'react'
import ReactDOM from 'react-dom'

// react-materializecss
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

// шрифт Roboto
import 'typeface-roboto'
import './index.sass'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
