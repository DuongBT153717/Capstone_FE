import { toast } from 'react-toastify'
import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'

const requestApi = {
  getAllRequestAndTicket: () => {
    try {
      const response = axiosClient.get(`${BASE_URL}/ticketRequest`)
      return response
    } catch (error) {
      console.log(error);
    }
  },

  getReceiveIdAndDepartment: () => {
    try {
      const response = axiosClient.post(`${BASE_URL}/getReceiveIdAndDepartmentId`)
      return response
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Request fail!')
      }
      if (error.response.status === 404) {
        toast.error('User not found!')
      }
    }
  }
}

export default requestApi