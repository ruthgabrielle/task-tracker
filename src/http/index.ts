import axios, { AxiosInstance } from "axios"

const clientHtttp: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/"
})

export default clientHtttp