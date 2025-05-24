import axios from "axios";

const API_UR = import.meta.env.VITE_API_PATH;

const config = (token = "") => ({
  headers: {
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${token}`
  },
})

export const login = async (data) =>
  await axios.post(`${API_UR}/auth/login`, data, config());

export const listUser = async (token, page) =>
  await axios.get(`${API_UR}/users?page=${page}`, config(token));

export const getUser = async (id, token) =>
  await axios.get(`${API_UR}/users/${id}`, config(token));

export const createUser = async (data, token) =>
  await axios.post(`${API_UR}/users`, data, config(token))

export const updateUser = async (id, data, token) =>
  await axios.put(`${API_UR}/users/${id}`, data, config(token))

export const register = async (data) =>
  await axios.post(`${API_UR}/auth/register`, data, config)

export const deleteUser = async (id, token) =>
  await axios.delete(`${API_UR}/users/${id}`, config(token))
