import axios from "axios";
import { authAtom } from "../atoms/index";

const tokenString = localStorage.getItem("token");
const tokens = JSON.parse(tokenString);
const authToken = tokens?.authToken;

const axiosWithAuth = axios.create({
  
  baseURL: "https://tushar-pet-adoption-backend.vercel.app",
  headers:{"common":{ "Authorization": `Bearer ${authToken}`}}
});

const setAuthHeader = () => {
  try {
    const tokenString = localStorage.getItem("token");
    const tokens = JSON.parse(tokenString);
    const authToken = tokens?.authToken;
    if (authToken) {
      axiosWithAuth.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authToken}`;
    }
  } catch (error) {
    console.error("Error while setting Authorization header:", error);
  }
};

axiosWithAuth.interceptors.request.use(
  async (config) => {
    // await setAuthHeader();
    return config;
  },
  (error) => {
    // if( error.response.status === 401 ){
    //   console.log("lol")
    //   var unauthorizedAccess = new CustomEvent("unauthorizedAccess");
    //   document.dispatchEvent(unauthorizedAccess)
    // }
    return Promise.reject(error);
  }
);

axiosWithAuth.interceptors.response.use(
  async (response) => {
    await setAuthHeader();
    return response;
  },
  (error) => {
    if( error.response.status === 401 ){
      console.log("lol")
      var unauthorizedAccess = new CustomEvent("unauthorizedAccess");
      document.dispatchEvent(unauthorizedAccess)
    }
    return Promise.reject(error);
  }
);

export default axiosWithAuth;

export const axiosWithoutAuth = axios.create({
  baseURL: "https://tushar-pet-adoption-backend.vercel.app",
});
