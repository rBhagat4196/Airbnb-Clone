import axios from "axios"
export const API = axios.create({
    baseURL : "http://localhost:4000/",
    responseType : "json"
  })

  export const imageAddress = "http://localhost:4000/uploads/"