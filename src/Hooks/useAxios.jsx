import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://server-rho-lime-60.vercel.app`

})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;