import React, { Fragment, useState, useEffect } from 'react'
import XLSX from 'xlsx'
import sha256 from 'js-sha256'
import { Container, Row, Col, Preloader } from 'react-materialize'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

// components
import Header from '../../components/Header'
import СlientsList from '../../components/Clients'
import Upload from '../../components/Upload'

import './try.sass'

const Try = () => {
  const [loads, setLoads] = useState([])
  const [countLoads, setCountLoads] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [nameBatch, setNameBatch] = useState('')

  let timerId = null

  // Экспорт списка в xlsx файл
  const exportToExcel = (i, loadName) => {
    const ws = XLSX.utils.json_to_sheet([['Выгрузка произведена с сайта SimilarData.ru']], { skipHeader: true})
    XLSX.utils.sheet_add_aoa(ws, [['№', 'ИНН', 'Ключевые лица', 'СБИС', 'Rusprofile']], { origin: 'A2'})

    ws['A1'].l = { Target: 'https://similardata.ru/', Tooltip: 'SimilarData - умный поиск клиентов для бизнеса' }

    loads[i].clients.forEach((client, index) => {
      XLSX.utils.sheet_add_aoa(ws, [[{ v: client.row_number, t: 'n' }, client.inn, client.info, { v: `https://sbis.ru/contragents/${ client.inn }`, l: { Target: `https://sbis.ru/contragents/${ client.inn }` } }, { v: `https://www.rusprofile.ru/search?query=${ client.inn }`, l: { Target: `https://www.rusprofile.ru/search?query=${ client.inn }` }, s: { font : { bold : true, underline: true }}}]], {origin: `A${ index + 3 }`})
    })
    
    ws['!cols'] = [
      { width: 8.8 },
      { width: 13.7 },
      { width: 50.7 },
      { width: 37.7 },
      { width: 48.7 }
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, loadName ? loadName.slice(0, 28) + '...' : 'Наименование отсутствует')

    XLSX.writeFile(wb, 'new_clients.xlsx', { cellStyles: true })
  }

  // Чтение xlsx файла
  const readExcel = file => {
    const promise = new Promise((resolve, reject) => {
      if (countLoads >= 3) {
        window.M.toast({html: 'Превышен лимит бесплатных попыток', displayLength: 5000, classes: 'red'})
        return
      }

      if (!file) {
        window.M.toast({html: `Неверный тип у файла "${ file.name }"`, displayLength: 5000, classes: 'red'})
        return
      }

      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = e => {
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

      fileReader.onerror = error => {
        window.M.toast({html: `Не удалось прочитать файл "${ file.name }"`, displayLength: 5000, classes: 'red'})

        reject(error)
      }
    })

    promise.then(data => {
      window.M.toast({html: `Файл "${ file.name }" успешно обработан`, displayLength: 5000, classes: 'green'})
      
      getNewClients(data)
      setNameBatch('')

      getClients(true)
    })
  }

  const getNewClients = async clients => {
    try {
      if (localStorage.getItem('userHash') === null) localStorage.setItem('userHash', sha256(new Date().toString()))

      const userHash = localStorage.getItem('userHash')

      const response = await fetch('/api/v1/batch/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameBatch, userHash, clients })
      })

      if (!response.ok) throw new Error('Something wrong')
    } catch (error) {
      console.error(error.message)
    }
  }

  const getClients = async isGetNewClients => {
    try {
      const userHash = localStorage.getItem('userHash')

      const response = await fetch(`/api/v1/batches/${ userHash }`)
      const { data } = await response.json()
      
      setLoads(data)
      setCountLoads(data.length)
      setIsLoading(true)

      let isProcessing = false

      // Запускаем получение данных о новых клиентах каждые 3 секудны
      data.forEach(load => {
        if (parseInt(load.status) !== 3) {
          isProcessing = true
          return
        }
      })

      if (isProcessing || isGetNewClients) {
        if (timerId === null) timerId = setInterval(getClients, 3000)
      }
      else {
        clearInterval(timerId)
        timerId = null
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  // Удаление загрузки
  const deleteLoad = async i => {
    try {
      const load = loads[i]

      await fetch(`/api/v1/batch/${ load.id }`, {
        method: 'DELETE'
      })

      window.M.toast({html: `Список ${ load.name ? '"' + load.name + '"' : 'без наименования' } успешно удален`, displayLength: 5000, classes: 'green'})
      
      setLoads(loads.filter(l => l.id !== load.id))
      setCountLoads(countLoads - 1)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const fetchData = () => {
      getClients()
    }

    fetchData()

    return () => clearInterval(timerId)
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Header/>
      <section className='try'>
        <Container>
          <Row>
            <Col s={12} m={12} l={12} xl={12}>
              <Upload readExcel={ readExcel } nameBatch = { nameBatch } setNameBatch = { setNameBatch } countLoads = { countLoads } />
            </Col>
            <Col s={12} m={12} l={12} xl={12}>
              {isLoading ? 
                loads.length !== 0 ? 
                  <СlientsList loads={ loads } deleteLoad = { deleteLoad } exportToExcel = { exportToExcel } /> 
                : <div className='data-not-found'>
                  <FontAwesomeIcon icon={ faList } size='7x' className='data-not-found-icon' />
                  <span>Список пуст<br></br>Возможно Вы еще не пользовались нашим сервисом, время попробовать!<br></br><a href='/files/sample.xls' download>Пример списка для загрузки</a></span>
                </div>
              : <Preloader
                active
                className='preloader'
                size='medium'
              />}
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  )
}

export default Try
