import { toast } from 'react-toastify'
import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'
const notificationApi = {
  createNewNotification: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/saveNewNotification`, data ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Upload success')
    } catch (error) {
        console.log(error);   
    }
  }
}

export default notificationApi