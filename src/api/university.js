import axios from 'axios';

const apiCall = axios.create({
  baseURL: 'http://universities.hipolabs.com/search',
});

export default apiCall