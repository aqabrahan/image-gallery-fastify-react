import axios from 'axios';

const restClient = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export default restClient;