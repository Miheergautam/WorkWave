import api from "../utils/api";

export const signin = async (credential) => {
  try {
    const response = await api.post("/user/signin", credential);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/user/register", userData);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
