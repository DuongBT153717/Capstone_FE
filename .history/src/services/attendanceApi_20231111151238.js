import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'
const attendanceApi = {
  getAlltUserInfo: async () => {
    try {
      const response = await axiosClient.get(`${BASE_URL}/getAllUserInfoPending`)
      return response
    } catch (error) {
        console.log(error);   
    }
  },

}

export default attendanceApi