import React, { Fragment } from 'react'
import { BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom'
import { Navbar, NavItem, SideNavItem } from 'react-materialize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './App.sass'

// routers
import Home from './routers/Home'
import Try from './routers/Try'

const App = () => {
  return (
    <Router>
      <header>
        <Navbar
          alignLinks='right'
          brand={ <NavLink to='/'>SimilarData</NavLink> }
          id='mobile-nav'
          centerChildren
          menuIcon={ <FontAwesomeIcon icon={ faBars } size='lg' /> }
          fixed
          sidenav={<Fragment>
            <SideNavItem subheader>
              Меню
            </SideNavItem>
            <SideNavItem divider />
            {<li><NavLink to='/#how-its-works' className='sidenav-close'>
              Как это работает?
            </NavLink></li>}
            {<li><NavLink to='/#faq' className='sidenav-close'>
              FAQ
            </NavLink></li>}
            {<li><NavLink to='/#contacts' className='sidenav-close'>
              Контакты
            </NavLink></li>}
            {<li><NavLink to='/try' className='sidenav-close btn'>
              Попробовать сейчас
            </NavLink></li>}
          </Fragment>}
        >
          <NavItem href='/#how-its-works'>
            Как это работает?
          </NavItem>
          <NavItem href='/#faq'>
            FAQ
          </NavItem>
          <NavItem href='/#contacts'>
            Контакты
          </NavItem>
        </Navbar>
      </header>
      
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/try' component={ Try } />
      </Switch>
    </Router>
  );
}

export default App;
