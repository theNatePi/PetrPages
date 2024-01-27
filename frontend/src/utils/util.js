import axios from 'axios';

const Backend = axios.create({
  baseURL: 'http://169.234.115.114:8000/',
  withCredentials: false,
});


const getAPI = async (path) => {
    const response = await Backend.get(path);
    return JSON.parse(response);
};


export default callAPI;

