import { toast } from 'react-toastify'
import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'

const logApi = {
  getChangeLogByEmployeeAndMonth: (data) => {
    try {
      const response = axiosClient.post(`${BASE_URL}/getChangeLogByEmployeeAndMonth`, data)
      return response
    } catch (error) {
      toast.error("Fetch Error")
    }
  },
  getChangeLogDetail: async (data) => {
    try {
      const response = await axiosClient.get(`${BASE_URL}/getChangeLogDetail`, {
        params: {
          employee_id: data.employee_id,
          date: data.date
        }
      })
      return response
    } catch (error) {
      toast.error("Fetch Error")
    }
  },
}

export default logApi
