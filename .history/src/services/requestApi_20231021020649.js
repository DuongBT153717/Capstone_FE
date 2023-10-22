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

  getReceiveIdAndDepartment: (data) => {
    try {
      const response = axiosClient.post(`${BASE_URL}/getReceiveIdAndDepartmentId`, data)
      return response
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Request fail!')
      }
      if (error.response.status === 404) {
        toast.error('User not found!')
      }
    }
  },
  requestAttendanceForm: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/requestAttendanceForm`, data)
      toast.success('Send request successfully')
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Request fail!')
      }
      if (error.response.status === 404) {
        toast.error('User not found!')
      }
    }
  },
  requestLeaveForm: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/requestLeaveForm`, data)
      toast.success('Send request successfully')
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Request fail!')
      }
      if (error.response.status === 404) {
        toast.error('User not found!')
      }
    }
  },
  getAllDepartment: () => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getAllDepartment`)
      return response
    } catch (error) {
      console.log(error);
    }
  },
  getAllRoom: () => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getAllRooms`)
      return response
    } catch (error) {
      console.log(error);
    }
  },
  getAllBookRooms: () => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getBookedRoom`)
      return response
    } catch (error) {
      console.log(error);
    }
  },
}

export default requestApi