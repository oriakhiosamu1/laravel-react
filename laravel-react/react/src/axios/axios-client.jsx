import axios from 'axios';

const AxiosClient = axios.create({
    // baseURL:`${import.meta.env.VITE_API_BASE_URL}/api`
    baseURL: `http://localhost:8000/api`
});

// INTERCEPTORS(FUNCTIONS THAT WILL BE EXECUTED BEFORE AND AFTER A REQUEST IS SENT)
AxiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
});

AxiosClient.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
    const {response} = error;
    if(response.status === 401){
        localStorage.removeItem('ACCESS_TOKEN')
    }

    throw error;
});

export default AxiosClient;
