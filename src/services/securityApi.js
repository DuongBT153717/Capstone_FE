import { toast } from "react-toastify"
import axiosClient from "../utils/axios-config"
import { BASE_URL } from "./constraint"

const secApi = {

    getListControlLog: async (data) => {

        try {
          const response = await axiosClient.post(`${BASE_URL}/listAllControlLogByStaff`, data)
          return response
    
        } catch (error) {
          if (error.response.status === 404) {
            toast.error('Log not found!')
          }
        }
      },

}
export default secApi