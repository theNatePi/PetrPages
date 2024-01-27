import axios from 'axios';

const Backend = axios.create({
  baseURL: 'http://169.234.115.114:8000/',
  withCredentials: false,
});


const getAPI = async (path) => {
    const response = await Backend.get(path);
    return JSON.parse(response);
};
// Example:
// Notes: Muse use await/async
// try {
//   const response = await callAPI("/schools/");
//   setSchools(response.data);
//   setLoading(true);
// } catch (err) {
//   console.log(err);
//   setLoading(true);
// }

export default getAPI;
