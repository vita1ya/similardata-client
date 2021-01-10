import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { Navbar, SideNavItem } from 'react-materialize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './header.sass'

export const Header = () => {
  return (
    <header>
      <Navbar
        alignLinks='right'
        brand={ <NavLink to='/' onClick={ () => document.getElementsByTagName('html')[0].scrollIntoView({block: 'start', behavior: 'smooth'}) }>SimilarData</NavLink> }
        id='mobile-nav'
        centerChildren
        menuIcon={ <FontAwesomeIcon icon={ faBars } size='lg' /> }
        fixed
        sidenav={
          <Fragment>
            <SideNavItem subheader>Меню</SideNavItem>
            <SideNavItem divider />
            {<li><HashLink smooth to='/#how-its-works' className='sidenav-close'>Как это работает?</HashLink></li>}
            {<li><HashLink smooth to='/#faq' className='sidenav-close'>FAQ</HashLink></li>}
            {<li><HashLink smooth to='/#contacts' className='sidenav-close'>Контакты</HashLink></li>}
            {<li><NavLink to='/soon' className='sidenav-close'>Регистрация</NavLink></li>}
            {<li><NavLink to='/try' className='sidenav-close btn'>Попробовать</NavLink></li>}
          </Fragment>
        }
      >
        <HashLink smooth to='/#how-its-works'>Как это работает?</HashLink>
        <HashLink smooth to='/#faq'>FAQ</HashLink>
        <HashLink smooth to='/#contacts'>Контакты</HashLink>
        <NavLink to='/soon'>Регистрация</NavLink>
      </Navbar>
    </header>
  )
}

export default Header
