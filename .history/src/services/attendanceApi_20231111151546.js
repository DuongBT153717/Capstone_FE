import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'
const attendanceApi = {
    getAttendanceUser: async (userId, month) => {
    try {
      const response = await axiosClient.get(`${BASE_URL}/getAttendanceUser`,{
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

}

export default attendanceApi