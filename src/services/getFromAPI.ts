import axios from 'axios'

const getFromAPI = axios.create({
    baseURL: 'https://find-happy-api.herokuapp.com/'
})

export default getFromAPI
