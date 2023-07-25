import axiosApi from "axios"

export const axios = axiosApi.create({
  baseURL: "http://localhost:3001/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" }
})