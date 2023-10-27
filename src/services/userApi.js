import { toast } from 'react-toastify'
import { changePaswordFailed, changePaswordStart, changePaswordSuccess, changeRoleAccountFailed, changeRoleAccountStart, changeRoleAccountSuccess, changeUserStatusFailed, changeUserStatusStart, changeUserStatusSuccess, getUserInfoFailed, getUserInfoStart, getUserInfoSuccess, updateProfileFailed, updateProfileStart, updateProfileSuccess } from '../redux/userSlice'
import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'
const userApi = {
  changePassword: async (data, dispatch) => {
    dispatch(changePaswordStart())
    try {
      await axiosClient.post(`${BASE_URL}/changePassword`, data)
      dispatch(changePaswordSuccess())
      toast.success('Update profile sucessfully!')
    } catch (error) {
      console.log(error)
      dispatch(changePaswordFailed())
    }
  },

  getAllDepartment: () => {
    try {
    const res =  axiosClient.get(`${BASE_URL}/getAllDepartment`)
    return res;
    } catch (error) {
      console.log(error)
    }
  },

  updateProfile: async (data, dispatch) => {
    dispatch(updateProfileStart())
    try {
      await axiosClient.post(`${BASE_URL}/changeUserInfo`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      dispatch(updateProfileSuccess())
      toast.success('Update profile sucessfully!')
    } catch (error) {
      console.log(error)
      dispatch(updateProfileFailed())
    }
  },
  getUserInfo: async (data, dispatch) => {
    dispatch(getUserInfoStart())
    try {
      const response = await axiosClient.post(`${BASE_URL}/getInfoUser`, data)
      dispatch(getUserInfoSuccess(response))
    } catch (error) {
      if (error.response.status === 404) {
        toast.error('User not found!')
        dispatch(getUserInfoFailed())
      }
    }
  },
  getRoleByUserId: async (data) => {
    try {
      const response = await axiosClient.post(`${BASE_URL}/getRoleByUserId`, data)
      return response;
    } catch (error) {
      if (error.response.status === 404) {
        toast.error('User not found!')
      }
    }
  },
  changeUserStatus: async (data, dispatch) => {
    dispatch(changeUserStatusStart())
    try {
      await axiosClient.post(`${BASE_URL}/changeStatusAccount`, data)
      dispatch(changeUserStatusSuccess())
      toast.success('Change status successfully')
    } catch (error) {
      if (error.response.status === 404) {
        toast.error('Status not found!')
        dispatch(changeUserStatusFailed())
      }
    }
  },
  changeRoleAccount: async (data, dispatch) => {
    dispatch(changeRoleAccountStart())
    try {
      await axiosClient.post(`${BASE_URL}/changeRoleAccount`, data)
      dispatch(changeRoleAccountSuccess())
      toast.success('Change role successfully')
    } catch (error) {
      if (error.response.status === 404) {
        toast.error('Role not found!')
        dispatch(changeRoleAccountFailed())
      }
    }
  },
  createAccount: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/register`, data)
      toast.success('Create account succesfully!')
    } catch (error) {
      if (error.response.status === 404) {
        toast.error('Role not found!')
      }
      if (error.response.status === 400) {
        toast.error('Username already exists!')
      }
    }
  }
  ,
  deleteAccount: async (data) => {
    try {
      await axiosClient.post(`${BASE_URL}/deleteAccount`, data)
      toast.success('Delete account succesfully!')
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Username is null!')
      }
      if (error.response.status === 404) {
        toast.error('Username already exists!')
      }
      if (error.response.status === 500) {
        toast.error('Can not delete!')
      }
    }
  }
}

export default userApi
