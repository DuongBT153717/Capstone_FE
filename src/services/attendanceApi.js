import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'
const attendanceApi = {
    getAttendanceUser: (userId, month) => {
    try {
      const response = axiosClient.get(`${BASE_URL}/getAttendanceUser`,{
        params: {
            user_id: userId,
            month: month
        }
      })
      return response
    } catch (error) {
        console.log(error);   
    }
  },

    getEvaluate: async  (data) => {
    try {
      const response = await axiosClient.post(`${BASE_URL}/getEvaluate`,data)
      return response
    } catch (error) {
        console.log(error);   
    }
  },
}

export default attendanceApi