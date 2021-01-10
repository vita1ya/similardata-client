import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-materialize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faFrown } from '@fortawesome/free-solid-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'

// components
import Header from '../../components/Header'

import './soon.sass'

const Soon = () => {
  return (
    <Fragment>
      <Header/>
      <section className='soon'>
        <Container>
          <Row>
            <Col s={ 12 } m={ 8 } offset='m2'>
              <div>
                <FontAwesomeIcon icon={ faFrown } size='5x'/>
                <p>К сожалению, мы только тестируем востребованность сервиса и пока не сделали платную версию.</p>
                <p>Если вам нужно найти больше 100 клиентов, модифицировать параметры отбора, исключить определенный сегмент или получить дополнительную информацию - свяжитесь с нами по почте или напишите в телеграм. Мы обязательно вам поможем</p>
                <div className='contacts'>
                  <a href='mailto:info@similardata.ru'><FontAwesomeIcon icon={ faAt } size='2x' />info@similardata.ru</a>
                  <a href="https://t.me/giffok" target='_blank' rel='noreferrer'><FontAwesomeIcon icon={ faTelegram } size='2x' />giffok</a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  )
}

export default Soon
