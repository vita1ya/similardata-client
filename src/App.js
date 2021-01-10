import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Preloader } from 'react-materialize'

// react-materializecss
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

import './App.sass'

// routers
const Home = lazy(() => import('./routers/Home'))
const Try = lazy(() => import('./routers/Try'))
const Soon = lazy(() => import('./routers/Soon'))
const NotFound = lazy(() => import('./routers/NotFound'))

const App = () => {
  return (
    <Suspense fallback={
      <Preloader
        active
        className='loader'
        size='big'
      />
    }>
      <Router>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/try' component={ Try } />
          <Route path='/soon' component={ Soon } />
          <Route component={ NotFound }/>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
