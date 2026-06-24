// userApi.js — API calls for /api/users

import axiosClient from "./axiosClient";

export const getAllUsers = async () => {
  const response = await axiosClient.get("/api/users");
  const data = response.data;
  return Array.isArray(data) ? data : (data.content ?? data.users ?? []);
};

export const getUserById = async (id) => {
  const response = await axiosClient.get(`/api/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const payload = {
    first_name: userData.firstName,
    last_name: userData.lastName,
    user_name_string: userData.userNameString,
  };
  const response = await axiosClient.post("/api/users", payload);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const payload = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    userNameString: userData.userNameString,
  };
  const response = await axiosClient.put(
    `/api/users/${parseInt(id, 10)}`,
    payload,
  );
  return response.data;
};

export const deleteUser = async (id) => {
  await axiosClient.delete(`/api/users/${parseInt(id, 10)}`);
};
