import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://picsum.photos',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response
    },
    (error: AxiosError): Promise<never> => {
        return Promise.reject(error)
    },
)

export default apiClient