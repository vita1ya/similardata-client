import React from 'react'
import { NavLink } from 'react-router-dom'

import './not-found.sass'

const NotFound = () => {
  document.title = 'Страница не найдена'

  return (
    <section className='not-found'>
      <div className="not-found-content">
        <h2>404</h2>
        <p>Страница, которую Вы пытались открыть, не найдена! <NavLink to='/'>Перейти&nbsp;на&nbsp;главную</NavLink></p>
      </div>
    </section>
  )
}

export default NotFound
