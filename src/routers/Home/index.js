import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Row, Col, Collection, CollectionItem,Collapsible, CollapsibleItem } from 'react-materialize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faFileAlt, faList, faFileUpload, faCogs, faUsers, faAddressBook, faThumbsDown, faQuestionCircle, faUserTie, faAt, faBuilding, faIndustry } from '@fortawesome/free-solid-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'
import Particles from 'react-particles-js'

// components
import Header from '../../components/Header'

import './home.sass'

const Home = () => {
  document.title = 'SimilarData - умный поиск клиентов для бизнеса'

  return (
    <Fragment>
      <Header/>
      <section id='greeting' className='valign-wrapper'>
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
                  "enable": false,
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
            <Col s={ 12 } m={ 10 } l={ 8 } xl={ 6 } offset='m1 l2 xl3'>
              <div className="greeting">
                <h1><span>SimilarData</span> - умный поиск клиентов для&nbsp;бизнеса</h1>
                <p>Поиск&nbsp;организаций, которым подходит ваш&nbsp;товар или услуга на&nbsp;основе искусственного&nbsp;интеллекта</p>
                <p>Найди новых&nbsp;клиентов, похожих на ваших&nbsp;текущих</p>
                <Collection>
                  <CollectionItem>
                    <FontAwesomeIcon icon={ faUserTie } size='2x' className='collection-item-icon' />
                    Выбор из 8 млн ИП и юридических лиц
                  </CollectionItem>
                  <CollectionItem>
                    <FontAwesomeIcon icon={ faDatabase } size='2x' className='collection-item-icon' />
                    Надежная база данных
                  </CollectionItem>
                  <CollectionItem>
                    <FontAwesomeIcon icon={ faBuilding } size='2x' className='collection-item-icon' />
                    Только действующие организации
                  </CollectionItem>
                  <CollectionItem>
                    <FontAwesomeIcon icon={ faIndustry } size='2x' className='collection-item-icon' />
                    Достаточно одного примера, чтобы начать поиск
                  </CollectionItem>
                </Collection>
                <NavLink className='btn' to='/try'>Попробовать</NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section id='how-its-works'>
        <Container>
          <h2>Как это работает?</h2>
          <Row>
            <Col s={ 12 } m={ 4 }>
              <div className="step">
                <div className="step-number">1</div>
                <FontAwesomeIcon icon={ faFileAlt } size='6x' />
                <span>Создайте список своих клиентов (или потенциальных клиентов, если в только начинаете деятельность)<br></br><a href='/files/sample.xls' download>Пример</a></span>
              </div>
            </Col>
            <Col s={ 12 } m={ 4 }>
              <div className="step">
                <div className="step-number">2</div>
                <FontAwesomeIcon icon={ faFileUpload } size='6x' />
                <span>Загрузите его на <NavLink to='/try'>странице</NavLink></span>
              </div>
            </Col>
            <Col s={ 12 } m={ 4 }>
              <div className="step">
                <div className="step-number">3</div>
                <FontAwesomeIcon icon={ faList } size='6x' />
                <span>Получите список организаций, похожих на загруженные</span>
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
              icon={ <FontAwesomeIcon icon={ faCogs } size='lg' className='faq-icon' /> }
              node='div'
            >
              <p>Правда. Похожие алгоритмы используются крупнейшими банками страны для поиска клиентов. Мы модифицировали их, чтобы они хорошо работали на аудитории любого размера</p>
            </CollapsibleItem>
            <CollapsibleItem
              expanded={ false }
              header='Насколько хорошо работает алгоритм? Что такое "похожая" организация?'
              icon={ <FontAwesomeIcon icon={ faQuestionCircle } size='lg' className='faq-icon' /> }
              node='div'
            >
              <p>В бесплатной версии сервиса основное влияние оказывает ОКВЭД организации и регион ее расположения. Если ваши клиенты - банки из Москвы, или стоматологии из Санкт-Петербурга - сервис сработает идеально. Но если вы продаете нишевый товар неспециализированным магазинам - точность будет ниже, т.к. эти магазины не будут иметь выделяющего их ОКВЭД. Если вы продаете разные товары разным клиентам - лучше загрузите их разными списками, точность будет выше.</p>
              <p>Качество примера тоже важно. Если у вас есть три разных целевых аудитории и немного "случайных" клиентов - попробуйте отдельные списки под каждую аудиторию, начиная с самой ценной - это сработает гораздо лучше.</p>
              <p>В платной версии сервиса список параметров увеличен (численность персонала, доход, дополнительные ОКВЭД, связанные ЮЛ/ФЛ, ...), но принцип остается тем же - для поиска разных типов клиентов лучше использовать разные примеры.</p>
            </CollapsibleItem>
            <CollapsibleItem
              expanded={ false }
              header='Список организаций это хорошо, а есть ли контакты ЛПР?'
              icon={ <FontAwesomeIcon icon={ faAddressBook } size='lg' className='faq-icon' /> }
              node='div'
            >
              <p>Вы можете использовать ФИО гендиректора/учредителей как стартовую точку для поиска. Также мы даем ссылку на профайл компании в котором, зачастую, имеются контакты организации. </p>
            </CollapsibleItem>
            <CollapsibleItem
              expanded={ false }
              header='А вы не украдете мою базу клиентов? Я вас не знаю'
              icon={ <FontAwesomeIcon icon={ faThumbsDown } size='lg' className='faq-icon' /> }
              node='div'
            >
              <p>Вы загружаете файл анонимно, не идентифицируя себя или компанию, в которой работаете. Даже если бы мы хотели украсть, мы бы не знали, что это за список. После перехода на платную версию мы, тем более, не будем заинтересованы в разрушении сотрудничества.</p>
            </CollapsibleItem>
            <CollapsibleItem
              expanded={ false }
              header='Как мне получить выгрузку по более, чем 100 организациям?'
              icon={ <FontAwesomeIcon icon={ faUsers } size='lg' className='faq-icon' /> }
              node='div'
            >
              <p>Мы тестируем востребованность сервиса. Если он вам понравился и вам нужно больше - напишите нам <a href='mailto:info@similardata.ru'>info@similardata.ru</a>, мы обязательно поможем</p>
            </CollapsibleItem>
          </Collapsible>
        </Container>
      </section>
      <section id='try' className='accent'>
        <Container>
          <h3>Мы сделаем всю работу по поиску "похожих" за вас!</h3>
          <Collection>
            <CollectionItem>
              не нужно разбираться в том, как устроена интеграция с государственными реестрами
            </CollectionItem>
            <CollectionItem>
              не нужно разбираться чем ОКОПФ отличается от ОКФС и чем отличаются версии ОКВЭД разных годов
            </CollectionItem>
            <CollectionItem>
              не нужно платить от миллиона рублей чтобы собрать все данные по юрлицам и ИП в одном месте
            </CollectionItem>
            <CollectionItem>
              вы можете накладывать на результаты дополнительные фильтры, чтобы сфокусировать поиск
            </CollectionItem>
            <CollectionItem>
              у вас есть возможность оценить качество работы сервиса бесплатно, быстро и без регистрации
            </CollectionItem>
          </Collection>
          <NavLink className='btn white black-text' to='/try'>Попробовать</NavLink>
        </Container>
      </section>
      <section id='contacts'>
        <Container>
          <Row>
            <Col s={ 12 } m={ 6 }>
              <div className='contact'>
                <a href='mailto:info@similardata.ru'><FontAwesomeIcon icon={ faAt } size='2x' />info@similardata.ru</a>
              </div>
            </Col>
            <Col s={ 12 } m={ 6 }>
              <div className='contact'>
                <a href="https://t.me/giffok" target='_blank' rel='noreferrer'><FontAwesomeIcon icon={ faTelegram } size='2x' />giffok</a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  )
}

export default Home
