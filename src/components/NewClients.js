import React, { useState } from 'react'
import { Collapsible, CollapsibleItem, Preloader, Modal, Button, Table } from 'react-materialize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const NewClients = (props) => {
  const { loads, deleteLoad } = props
  
  const [idLoadForDelete, setIdLoadForDelete] = useState(null)
  
  const openModal = (i) => {
    setIdLoadForDelete(i)

    // Открываем модальное окно
    window.M.Modal.getInstance(document.getElementById('modal-confirm')).open()
  }

  return (
    <div className='clients'>
      <Modal
        actions={[
          <Button modal='close' node='button' className='btn' onClick={ () => deleteLoad(idLoadForDelete) }>Да</Button>,
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
            expanded={ index === 0 ? true : false }
            header={
              <div className='collapsible-header-wrapper'>
                <span>Загрузка №{ load.id }</span>
                {parseInt(load.status) !== 3 && parseInt(load.status) !== -1 ? 
                <Preloader
                  active
                  className='collapsible-loader'
                  color='green'
                  size='small'
                /> : <div className='delete-load' onClick={ () => {
                  window.M.Collapsible.getInstance(document.querySelector('.collapsible')).close(index)
                  openModal(index)
                } }>
                    <FontAwesomeIcon icon={ faTrashAlt }></FontAwesomeIcon>
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
                    <th data-field="row_number">
                      №
                    </th>
                    <th data-field="inn">
                      ИНН
                    </th>
                    <th data-field="priority">
                      Приоритет
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {load.clients.map(client => (
                    <tr key={client.inn}>
                      <td>
                        { client.row_number }
                      </td>
                      <td>
                        <a href={ 'https://sbis.ru/contragents/' + client.inn } target='_blank' rel='noreferrer'>{ client.inn }</a>
                      </td>
                      <td>
                        { client.priority }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            : <span>Нет записей...</span>}
          </CollapsibleItem>
        ))}
      </Collapsible>
    </div>
  )
}

export default NewClients
