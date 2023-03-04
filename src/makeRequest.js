import axios from "axios";

export const makeAuthRequest = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        Authorization: "bearer " + sessionStorage.getItem("jwt")
    }
})

export const makeRequest = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
})