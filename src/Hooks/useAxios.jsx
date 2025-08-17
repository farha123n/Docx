import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://farhan-coral.vercel.app`

})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;