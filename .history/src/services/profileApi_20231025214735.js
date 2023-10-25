import { toast } from 'react-toastify'
import { acceptAllUserInfoFailed, acceptAllUserInfoStart, acceptAllUserInfoSuccess } from '../redux/profileSlice'
import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'
const profileApi = {
  getAlltUserInfo: async () => {
    try {
      const response = await axiosClient.get(`${BASE_URL}/getAllUserInfoPending`)
      return response
    } catch (error) {
        console.log(error);   
    }
  },
  acceptUserInfo: async (data, dispatch) => {
    dispatch(acceptAllUserInfoStart())
    try {
      await axiosClient.post(`${BASE_URL}/acceptChangeUserInfo`, data)
      dispatch(acceptAllUserInfoSuccess())
      toast.success('Accept User Info Successfully!!')
    } catch (error) {
        console.log(error);
        dispatch(acceptAllUserInfoFailed())    
    }
  },
  rejectUserInfo: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/rejectChangeUserInfo`, data)
      toast.success('Reject User Info Successfully!!')
    } catch (error) {
        console.log(error); 
    }
  },
}

export default profileApi
