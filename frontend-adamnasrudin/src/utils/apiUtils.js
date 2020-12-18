const axios = require("axios");

const commonAxios = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});
function sleep(delay, value) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay, value);
  });
}
commonAxios.interceptors.response.use(
  function (response) {
    const { data } = response;

    return sleep(100, data);
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { commonAxios };
