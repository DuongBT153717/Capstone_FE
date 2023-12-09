import { toast } from "react-toastify"
import axiosClient from "../utils/axios-config"
import { BASE_URL } from "./constraint"
const securityApi = {
    getListControlLogByDayAndDevice:  (data) => {
        try {
            let res =  axiosClient.post(`${BASE_URL}/getListControlLogByDayAndDevice`, data)
            return res;
        } catch (error) {
            if (error.response.status === 400) {
                toast.error('End time must be greater than start time')
              }
        }
    },
    getListStrangerLogByDayAndDevice:  (data) => {
        try {
            let res =  axiosClient.post(`${BASE_URL}/getListStrangerLogByDayAndDevice`, data)
            return res;
        } catch (error) {
            if (error.response.status === 400) {
                toast.error('End time must be greater than start time')
              }
        }
    },
    listAllDevice: async () => {
        try {
            let res = await axiosClient.get(`${BASE_URL}/listAllDevice`)
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    getControlLogDetail: async (username, controlLogId) => {
        try {
            let res = await axiosClient.get(`${BASE_URL}/getControlLogDetail`,
                {
                    params: {
                        username: username,
                        controlLogId: controlLogId
                    }
                })
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    // getControlListByAccount: async (username) => {
    //     try {
    //         let res = await axiosClient.get(`${BASE_URL}/getListControlLogByAccount`,
    //             {
    //                 params: {
    //                     username: username,
    //                 }
    //             })
    //         return res;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    getControlListByAccount: (username) => {
        try {
          const response = axiosClient.get(`${BASE_URL}/getListControlLogByAccount`, {
            params: {
                username: username,
            }
          })
          return response
        } catch (error) {
          if (error.response.status === 404) {
            toast.error("This account hasn't had log yet!")
          }
        }
      },

}

export default securityApi
