import api from "./axios";

/*
REGISTER
*/
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

/*
LOGIN
*/
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  return response.data;
};

/*
LOGOUT
*/
export const logoutUser = () => {
  localStorage.removeItem("token");

  localStorage.removeItem("user");
};

/*
GET CURRENT USER
*/
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};
