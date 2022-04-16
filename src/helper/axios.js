import axios from "axios";

// export const Axios = axios.create({
//   baseURL: "https://hotelist-be.herokuapp.com/api",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json;charset=UTF-8",
//     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//   },
// });

let Axios = axios.create({
  baseURL: "https://hotelist-be.herokuapp.com/api",
})

Axios.defaults.headers.common['Accept'] = "application/json";
Axios.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";
Axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

function AxiosLoad() {
  Axios = axios.create({
    baseURL: "https://hotelist-be.herokuapp.com/api",
  })

  Axios.defaults.headers.common['Accept'] = "application/json";
  Axios.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";
  Axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
}
export {Axios, AxiosLoad};