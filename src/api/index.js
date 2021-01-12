import axios from 'axios'

export default axios.create({
  baseURL: 'https://similardata.ru/api/v1'
  //baseURL: 'http://localhost:3001/api/v1'
})
