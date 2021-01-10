import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Collapsible, CollapsibleItem, Preloader, Modal, Button, Table } from 'react-materialize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faChevronDown, faFileExport, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'

import './clients.sass'

const NewClients = (props) => {
  const { loads, deleteLoad, exportToExcel } = props

  const [idLoadForDelete, setIdLoadForDelete] = useState(null)

  useEffect(() => {
    document.getElementsByClassName('clients')[0].addEventListener('click', (e) => {
      if (e.target.classList.contains('export-to-excel') || e.target.parentElement.classList.contains('export-to-excel') || e.target.parentElement.parentElement.classList.contains('export-to-excel')) {
        const exportId = e.target.dataset.exportId || e.target.parentElement.dataset.exportId || e.target.parentElement.parentElement.dataset.exportId
        const exportName = e.target.dataset.exportName || e.target.parentElement.dataset.exportName || e.target.parentElement.parentElement.dataset.exportName

        exportToExcel(exportId, exportName)
        
        e.stopPropagation()
      }

      if (e.target.classList.contains('delete-load') || e.target.parentElement.classList.contains('delete-load') || e.target.parentElement.parentElement.classList.contains('delete-load')) {
        const deleteId = e.target.dataset.deleteId || e.target.parentElement.dataset.deleteId || e.target.parentElement.parentElement.dataset.deleteId
        
        setIdLoadForDelete(deleteId)

        // Открываем модальное окно
        window.M.Modal.getInstance(document.getElementById('modal-confirm')).open()
        
        e.stopPropagation()
      }
    }, true)

    // eslint-disable-next-line
  }, [])

  return (
    <div className='clients'>
      <Modal
        actions={[
          <Button modal='close' node='button' onClick={ () => deleteLoad(idLoadForDelete) }>Да</Button>,
          <Button flat modal='close' node='button' waves='red' onClick={ () => setIdLoadForDelete(null) }>Нет</Button>
        ]}
        bottomSheet={ false }
        fixedFooter={ false }
        header='Подтверждение'
        id='modal-confirm'
      >
        Вы уверены, что хотите удалить запись?
      </Modal>
      <Collapsible accordion={ false }>
        {loads.map((load, index) => (
          <CollapsibleItem
            key={ load.id }
            expanded={ index === 0 ? true : false  }
            icon={ <FontAwesomeIcon icon={ faChevronDown } className='expand'></FontAwesomeIcon> }
            header={
              <div className='collapsible-header-wrapper'>
                <span>{ load.name ? load.name : 'Наименование отсутствует' }</span>
                {parseInt(load.status) !== 3 && parseInt(load.status) !== -1 ? 
                <Preloader
                  active
                  className='collapsible-loader'
                  size='small'
                /> : <div className='collapsible-header-actions'>
                    <NavLink to='/soon' className='soon-btn'>
                      <FontAwesomeIcon icon={ faCartArrowDown } title='Больше клиентов'></FontAwesomeIcon>
                      <span className='hide-on-small-only'> больше клиентов</span>
                    </NavLink>
                    <div className='export-to-excel' data-export-id={ index } data-export-name={ load.name }>
                      <FontAwesomeIcon icon={ faFileExport } title='Экспорт'></FontAwesomeIcon>
                    </div>
                    <div className='delete-load' data-delete-id={ index }>
                      <FontAwesomeIcon icon={ faTrashAlt } title='Удалить'></FontAwesomeIcon>
                    </div>
                  </div>}
              </div>}
            node='div'
            
          >
            {load.clients && load.clients.length !== 0 ? 
              <Table
                centered={ true }
                responsive={ true }
              >
                <thead>
                  <tr>
                    <th name='number'>№</th>
                    <th>ИНН</th>
                    <th>Наименование</th>
                    <th>Ключевые лица</th>
                    <th>Доп. инфо</th>
                  </tr>
                </thead>
                <tbody>
                  {load.clients.map(client => (
                    <tr key={client.inn}>
                      <td>
                        { client.row_number }
                      </td>
                      <td>
                        { client.inn }
                      </td>
                      <td>
                        { client.name ? client.name : '-' }
                      </td>
                      <td>
                        { client.info ? client.info : '-' }
                      </td>
                      <td>
                        <a href={ `https://sbis.ru/contragents/${ client.inn }` } target='_blank' rel='noreferrer'>СБИС</a>,&nbsp;<a href={ `https://www.rusprofile.ru/search?query=${ client.inn }` } target='_blank' rel='noreferrer'>Rusprofile</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            : parseInt(load.status) === 2 ? <span>Нет записей...</span> : <span>Идет формирование списка новых клиентов...</span>}
          </CollapsibleItem>
        ))}
      </Collapsible>
    </div>
  )
}

export default NewClients
