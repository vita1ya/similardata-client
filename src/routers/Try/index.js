import React, { Fragment, useState, useEffect } from 'react'
import XLSX from 'xlsx'
import sha256 from 'js-sha256'
import { Container, Row, Col, Preloader } from 'react-materialize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faList } from '@fortawesome/free-solid-svg-icons'
import API from '../../api'

// components
import Header from '../../components/Header'
import Сlients from '../../components/Clients'
import Upload from '../../components/Upload'

import './try.sass'

const Try = () => {
  const [batches, setBatches] = useState([])
  const [flags, setFlags] = useState({ loading: false, error: false })
  const [batchName, setBatchName] = useState('')

  let timerId = null

  // Экспорт списка в xlsx файл
  const exportToExcel = (i, name) => {
    try {
      const ws = XLSX.utils.json_to_sheet([['Выгрузка произведена с сайта SimilarData.ru']], { skipHeader: true})
      XLSX.utils.sheet_add_aoa(ws, [['№', 'ИНН', 'Ключевые лица', 'СБИС', 'Rusprofile']], { origin: 'A2'})

      ws['A1'].l = { Target: 'https://similardata.ru/', Tooltip: 'SimilarData - умный поиск клиентов для бизнеса' }

      batches[i].clients.forEach((client, index) => {
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
      XLSX.utils.book_append_sheet(wb, ws, name ? name.slice(0, 28) + '...' : 'Наименование отсутствует')

      XLSX.writeFile(wb, 'new_clients.xlsx', { cellStyles: true })
    } catch (error) {
      window.M.toast({html: 'При выгрузке файла что-то пошло не так...', displayLength: 3000, classes: 'red'})
    }
  }

  // Чтение xlsx файла
  const readExcel = file => {
    const promise = new Promise((resolve, reject) => {
      if (batches.length >= 3) return window.M.toast({html: 'Превышен лимит бесплатных попыток', displayLength: 3000, classes: 'red'})

      if (!file) return window.M.toast({html: `Неверный тип у файла "${ file.name }"`, displayLength: 3000, classes: 'red'})

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
        window.M.toast({html: `Не удалось прочитать файл "${ file.name }"`, displayLength: 3000, classes: 'red'})

        reject(error)
      }
    })

    promise.then(data => {
      window.M.toast({html: `Файл "${ file.name }" успешно прочитан`, displayLength: 3000, classes: 'green'})
      
      getNewClients(data)
      setBatchName('')

      getClients(true)
    })
  }

  // Создаем новый список
  const getNewClients = async clients => {
    try {
      if (localStorage.getItem('userHash') === null) localStorage.setItem('userHash', sha256(new Date().toString()))

      const userHash = localStorage.getItem('userHash')

      await API.post('/batches/new', {
        batchName, userHash, clients
      })
    } catch (error) {
      window.M.toast({ html: 'При формировании новых клиентов что-то пошло не так...', displayLength: 3000, classes: 'red' })
    }
  }

  // Получаем все списки
  const getClients = async isGetNewClients => {
    try {
      const userHash = localStorage.getItem('userHash')

      const response = await API.get(`/batches/${ userHash }`)

      setBatches(response.data)
      setFlags({ ...flags, loading: true, error: false })

      let isProcessing = false

      // Запускаем получение данных о новых клиентах каждые 3 секудны
      response.data.forEach(batch => {
        if (parseInt(batch.status) !== 3) {
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
      setFlags({ ...flags, error: true })
    }
  }

  // Удаление списка
  const deleteBatch = async i => {
    try {
      const batch = batches[i]

      await API.delete(`/batches/${ batch.id }`)

      window.M.toast({ html: `Список ${ batch.name ? '"' + batch.name + '"' : 'без наименования' } успешно удален`, displayLength: 3000, classes: 'green' })
      
      setBatches(batches.filter(b => b.id !== batch.id))
    } catch (error) {
      window.M.toast({ html: 'При удалении списка что-то пошло не так...', displayLength: 3000, classes: 'red' })
    }
  }

  useEffect(() => {
    const fetchData = () => {
      getClients(false)
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
              <Upload readExcel={ readExcel } batchName = { batchName } setBatchName = { setBatchName } batches = { batches } />
            </Col>
            <Col s={12} m={12} l={12} xl={12}>
              {!flags.error ? 
                flags.loading ? 
                  batches.length !== 0 ? 
                    <Сlients batches={ batches } deleteBatch = { deleteBatch } exportToExcel = { exportToExcel } /> 
                  : <div className='data-message'>
                      <FontAwesomeIcon icon={ faList } size='7x' />
                      <span>Список пуст<br></br>Возможно Вы еще не пользовались нашим сервисом, время попробовать!<br></br><a href='/files/sample.xls' download>Пример списка для загрузки</a></span>
                    </div>
                : <Preloader
                    active
                    className='preloader'
                    size='medium'
                  />
              : <div className='data-message'>
                  <FontAwesomeIcon icon={ faExclamationCircle } size='7x' />
                  <span>При получении данных что-то пошло не так...</span>
                </div>}
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  )
}

export default Try
