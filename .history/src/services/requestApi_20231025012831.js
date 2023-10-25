import { toast } from 'react-toastify'
import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'

const requestApi = {
  getAllRequestAndTicket: (data) => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getTicketByUser`, {
        params: {
          sender_id: data
        }
      })
      return response
    } catch (error) {
      console.log(error);
    }
  
  },
  

  getAllRequestAndTicketByHr: () => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getTicketHr`)
      return response
    } catch (error) {
      console.log(error);
    }
  
  },
  getDetailAttendanceMessageById: (data) => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getAttendanceMessage/`,{
        params :{
          request_id : data
        }
      })
      return response
    } catch (error) {
      console.log(error);
    }
  },
  getDetailLeaveMessageById: (data) => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getLeaveMessage/`,{
        params :{
          request_id : data
        }
      })
      return response
    } catch (error) {
      console.log(error);
    }
  },

  getTicketDepartment: (data) => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getTicketDepartment`, {
        params :{
          department :data
        }
      })
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
  acceptAttendanceRequest: async (data) => {
    let data1 ={
      attendanceRequestId : data
    }
    try {
       await axiosClient.post(`${BASE_URL}/acceptAttendanceRequest`, data1)
      toast.success('Accept request success')
    } catch (error) {
    console.log(error);
    }
  },
  acceptLeaveRequest: async (data) => {
    let data1 ={
      leaveRequestId : data
    }
    try {
       await axiosClient.post(`${BASE_URL}/acceptLeaveRequest`, data1)
      toast.success('Accept request success')
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
  requestAttendanceFormExistTicket: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/requestAttendanceFormExistTicket`, data)
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
  otherFormExistRequest: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/otherFormExistRequest`, data)
      toast.success('Send Message successfully')
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Request fail!')
      }
      if (error.response.status === 404) {
        toast.error('User not found!')
      }
    }
  },
  requestLeaveFormExistTicket: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/requestLeaveFormExistTicket`, data)
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
  requestOtherForm: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/otherForm`, data)
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
  otherFormExistTicket: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/otherFormExistTicket`, data)
      toast.success('Send Message successfully')
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
  createRoomBookingTicket: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/roomBookingForm`, data)
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

  getAllRequestAndTicketByAdmin: () => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getTicketAdmin`)
      return response
    } catch (error) {
      console.log(error);
    }
  },

  getAllTicketHr: () => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getTicketHr`)
      return response
    } catch (error) {
      console.log(error);
    }
  },
  
  getRequestDetailByAdmin: (data) => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getRoomBookingMessage`, {
        params: {
          request_id: data
        }
      })
      return response
    } catch (error) {
      console.log(error);
    }
  },

  acceptBookRoom: async (data) => {
    try {
      await axiosClient.put(`${BASE_URL}/acceptBookRoom`, {
        params: {
          room_form_id: data
        }
      })
      toast.success('Accept book room successfully!')
    } catch (error) {
      console.log(error);
    }
  },
  closeTicketAttendence: async (data) => {
    
    try {
      await axiosClient.post(`${BASE_URL}/acceptChangeUserInfo`, data)
      toast.success('Finish Ticket Success !')
    } catch (error) {
        console.log(error);
    }
  },
}

export default requestApi