import axios from 'axios';

const Backend = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: false,
});


const getAPI = async (path) => {
    const response = await Backend.get(path);
    console.log(response);
    return JSON.parse(response.data);
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

const postAPI = async (path, body) => {
  const response = await Backend.post(path, body);
  return JSON.parse(response.data);
};
export {postAPI, getAPI};
