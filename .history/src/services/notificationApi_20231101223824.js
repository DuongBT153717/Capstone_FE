import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'
const profileApi = {
  createNewNotification: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/getAllUserInfoPending`, data ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
        console.log(error);   
    }
  }
}

export default profileApi