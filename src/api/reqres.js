import axios from 'axios';

const apiCall = axios.create({
  baseURL: 'https://reqres.in/api/',
});

export default apiCall