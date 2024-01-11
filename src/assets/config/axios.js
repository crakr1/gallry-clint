import axios from 'axios'
import { API_URL } from './url'

const instance = axios.create({
    baseURL: API_URL,
    responseType: "json"
})

export default instance