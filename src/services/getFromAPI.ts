import axios from 'axios'

const getFromAPI = axios.create({
    baseURL: 'http://localhost:3333'
})

export default getFromAPI
