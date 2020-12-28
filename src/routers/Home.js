import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Row, Col, Collection, CollectionItem,Collapsible, CollapsibleItem } from 'react-materialize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faFileAlt, faListOl, faFileUpload, faCogs, faUsers, faAddressBook, faThumbsDown, faQuestionCircle, faUserTie, faAt } from '@fortawesome/free-solid-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'
import Particles from 'react-particles-js'

export const Home = () => {
  return (
    <Fragment>
      <section id='greeting'>
        <Particles 
          params={{
            "particles": {
              "number": {
                "value": 50,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#000000"
              },
              "shape": {
                "type": "image",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 3
                },
                "image": {
                  "src": "/images/client.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 1,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 14,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 180,
                "color": "#26a69a",
                "opacity": 0.7,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "bubble"
                },
                "onclick": {
                  "enable": false,
                  "mode": "push"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 85,
                  "size": 30,
                  "duration": 1,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          }}
        />
        <Container>
          <Row>
            <Col s={12} m={8} offset='m2'>
              <div className="greeting">
                <h1><span>SimilarData</span> - умный поиск клиентов для&nbsp;бизнеса</h1>
                <p>
                  Поиск&nbsp;организаций, которым подходит ваш&nbsp;товар или услуга на&nbsp;основе искусственного&nbsp;интеллекта
                </p>
                <Collection>
                  <CollectionItem>
                    <FontAwesomeIcon icon={ faUserTie } size='2x' />Выбор из 8 млн ИП и юридических лиц
                  </CollectionItem>
                  <CollectionItem>
                    <FontAwesomeIcon icon={ faDatabase } size='2x' />Надежная база данных
                  </CollectionItem>
                </Collection>
                <NavLink className='btn btn-large' to='/try'>Попробовать</NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section id='how-its-works'>
        <Container>
          <h2>Как это работает?</h2>
          <Row>
            <Col s={12} m={4}>
              <div className="step">
                <div className="step-number">1</div>
                <FontAwesomeIcon icon={ faFileAlt } size='6x' />
                <span>Создайте список своих клиентов (или потенциальных клиентов, если в только начинаете деятельность)<br></br><a href='/files/sample.xls' download>Пример</a></span>
              </div>
            </Col>
            <Col s={12} m={4}>
              <div className="step">
                <div className="step-number">2</div>
                <FontAwesomeIcon icon={ faFileUpload } size='6x' />
                <span>Загрузите его на <NavLink to='/try'>странице</NavLink></span>
              </div>
            </Col>
            <Col s={12} m={4}>
              <div className="step">
                <div className="step-number">3</div>
                <FontAwesomeIcon icon={ faListOl } size='6x' />
                <span>И получите список организаций, похожих на загруженные</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section id='faq'>
        <Container>
          <h2>FAQ</h2>
          <Collapsible accordion={ false }>
            <CollapsibleItem
              expanded={ false }
              header='А сервис правда работает? '
              icon={ <FontAwesomeIcon icon={ faCogs } size='lg' /> }
              node='div'
            >
              Правда. Похожие алгоритмы используются крупнейшими банками страны для поиска клиентов
            </CollapsibleItem>
            <CollapsibleItem
              expanded={ false }
              header='Насколько хорошо работает алгоритм? Что такое "похожая" организация?'
              icon={ <FontAwesomeIcon icon={ faQuestionCircle } size='lg' /> }
              node='div'
            >
              Основное влияние оказывает ОКВЭД организации и регион ее расположения. Если ваши клиенты - банки из Москвы, или стоматологии из Санкт-Петербурга - сервис сработает идеально. Но если вы продаете нишевый товар неспециализированным магазинам - точность будет ниже, т.к. эти магазины не будут иметь выделяющего их ОКВЭД. Если вы продаете разные товары разным клиентам - лучше загрузите их разными списками, точность будет выше
            </CollapsibleItem>
            <CollapsibleItem
              expanded={ false }
              header='Список организаций это хорошо, а есть ли контакты ЛПР?'
              icon={ <FontAwesomeIcon icon={ faAddressBook } size='lg' /> }
              node='div'
            >
              Мы даем ссылку но профайл компании. В профайле указывается гендиректор и, зачастую, контакты организации
            </CollapsibleItem>
            <CollapsibleItem
              expanded={ false }
              header='А вы не украдете мою базу клиентов? Я вас не знаю'
              icon={ <FontAwesomeIcon icon={ faThumbsDown } size='lg' /> }
              node='div'
            >
              Вы загружаете файл анонимно, не идентифицируя себя или компанию, в которой работаете. Даже если бы мы хотели украсть, мы бы не знали, что это за список
            </CollapsibleItem>
            <CollapsibleItem
              expanded={ false }
              header='Как мне получить выгрузку по более, чем 100 организациям?'
              icon={ <FontAwesomeIcon icon={ faUsers } size='lg' /> }
              node='div'
            >
              Мы тестируем востребованность сервиса. Если он вам понравился и вам нужно больше - напишите нам <a href='mailto:giffok@yandex.ru'>giffok@yandex.ru</a>, мы обязательно поможем
            </CollapsibleItem>
          </Collapsible>
        </Container>
      </section>
      <section id='try' className='accent'>
        <Container>
          <p>Найдите новых клиентов для вашего бизнеса прямо сейчас, это бесплатно</p>
          <NavLink className='btn btn-large white black-text' to='/try'>Попробовать</NavLink>
        </Container>
      </section>
      <section id='contacts'>
        <Container>
          <Row>
            <Col s={ 12 } m={ 6 }>
              <div className='contact'>
                <a href="https://t.me/giffok" target='_blank' rel='noreferrer'>{ <FontAwesomeIcon icon={ faTelegram } size='2x' /> } giffok</a>
              </div>
            </Col>
            <Col s={ 12 } m={ 6 }>
              <div className='contact'>
                <a href='mailto:giffok@yandex.ru'>{ <FontAwesomeIcon icon={ faAt } size='2x' /> } giffok@yandex.ru</a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  )
}

export default Home
