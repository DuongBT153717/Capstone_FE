import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'

const requestApi = {
  getAllRequestAndTicket: () => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getTicketHr`)
      return response
    } catch (error) {
      console.log(error);
    }
  }
}

export default requestApi