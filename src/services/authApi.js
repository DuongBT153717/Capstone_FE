import axios from 'axios'
import { BASE_URL } from './constraint'
import axiosClient from '../utils/axios-config'

const authApi = {
    signIn: (data) => {
        const url = `${BASE_URL}/login`
        return axios.post(url, data)
    },
    changePassword: (data) => {
        const url = `${BASE_URL}/changePassword`
        return axiosClient.post(url, data)
    }
}

export default authApi