import React, { Fragment, useState, useEffect } from 'react'
import XLSX from 'xlsx'
import sha256 from 'js-sha256'
import { Container, Row, Col, Preloader } from 'react-materialize'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

// components
import NewClientsList from '../components/NewClients'
import DropZone from '../components/DropZone'

export const Try = () => {
  const [loads, setLoads] = useState([])
    const [isLoading, setIsLoading] = useState(false)
  
  let updater = null

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      if (!file) {
        window.M.toast({html: 'Неверный тип файла', displayLength: 5000, classes: 'red'})
        return
      }

      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e) => {
        const wb = XLSX.read(e.target.result, { type: 'buffer' }),
          wsname = wb.SheetNames[0],
          ws = wb.Sheets[wsname],
          data = XLSX.utils.sheet_to_json(ws, { header: 1 })

        let newData = []
        
        data.forEach(inn => {
          if(Number.isInteger(inn[0]) && inn[0].toString().length < 21) newData.push([inn[0]])
        })

        resolve(newData)
      }

      fileReader.onerror = (error) => {
        window.M.toast({html: 'Не удалось загрузить файл', displayLength: 5000, classes: 'red'})

        reject(error)
      }
    })

    promise.then((data) => {
      window.M.toast({html: 'Файл успешно загружен', displayLength: 5000, classes: 'green'})
      
      getNewClients(data)
    })
  }

  const getNewClients = async (uploadedClients) => {
    try {
      if (localStorage.getItem('userHash') === null) localStorage.setItem('userHash', sha256(new Date().toString()))

      const userHash = localStorage.getItem('userHash')

      const response = await fetch('/api/v1/clients/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userHash, uploadedClients })
      })

      if (!response.ok) throw new Error('Something wrong')
    } catch (error) {
      console.error(error.message)
    }
  }

  const getClients = async () => {
    try {
      const userHash = localStorage.getItem('userHash')

      const response = await fetch(`/api/v1/loads/${ userHash }`)
      const { data } = await response.json()

      setLoads(data.loads)
      setIsLoading(true)

      // Запускаем получение данных о новых клиентах каждые 3 секудны
      // if (data.loads[0]) {
      //   if (parseInt(data.loads[0].status) !== 3) {
      //     if (updater !== null) return
          
      //     updater = setInterval(getClients, 3000)
      //   }
      //   else {
      //     clearInterval(updater)
      //     updater = null
      //   }
      // }
    } catch (error) {
      console.error(error.message)
    }
  }

  // Удаление загрузки
  const deleteLoad = async (i) => {
    try {
      const id = loads[i].id

      await fetch(`/api/v1/loads/${ id }`, {
        method: 'DELETE'
      })
      
      setLoads(loads.filter(load => load.id !== id))

      window.M.toast({html: `Загрузка №${id} успешно удалена`, displayLength: 5000, classes: 'green'})
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const fetchData = () => {
      getClients()
    }

    fetchData()
    return () => setLoads([])
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Container>
        <Row>
          <Col s={12} m={12} l={12} xl={12}>
            <DropZone readExcel={ readExcel } />
          </Col>
          <Col s={12} m={12} l={12} xl={12}>
            {isLoading ? 
              loads.length !== 0 ? 
                <NewClientsList loads={ loads } deleteLoad = { deleteLoad } /> 
              : <div className='not-found'>
                <FontAwesomeIcon icon={ faList } size='7x' />
                <span>Список пуст<br></br>Возможно Вы еще не пользовались нашим сервисом, время попробовать!<br></br><a href='/files/sample.xls' download>Пример списка для загрузки</a></span>
              </div>
            : <Preloader
              active
              className='loader'
              color='green'
              size='medium'
            />}
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Try
