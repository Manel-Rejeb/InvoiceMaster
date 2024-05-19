import axios, { type AxiosInstance } from 'axios'

export const query: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  // headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
})
