import axios from 'axios'

const service = axios.create({
  baseURL: '/data/id1_data.json',
  timeout: 5000
})

export default service
