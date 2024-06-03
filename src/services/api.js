import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://rocketnotes-api-py2f.onrender.com'
})