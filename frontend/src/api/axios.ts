import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: false
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res)=>res,
  (err)=>{
    const msg = err?.response?.data?.message || err.message;
    console.error('API error:', msg);
    return Promise.reject(err);
  }
);

export default api;
