import axios from "axios";

const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "produrl";

axios.defaults.withCredentials = true;

export const defaultRoute = async () => {
  try {
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export const register = async (newUser) => {
  try {
    const response = await axios.post(`${apiURL}/auth/register`, newUser);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export const login = async (userInfo) => {
  try {
    const response = await axios.post(`${apiURL}/auth/login`, userInfo);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export const logout = async () => {
  try {
    await axios.get(`${apiURL}/auth/logout`);
  } catch (error) {
    console.error(error.message);
  }
}


// export const getAllCartoons = async () => {
//   try {
//     const response = await axios.get(`${apiURL}/cartoons/`);
//     return response.data;
//   } catch (error) {
//     console.error(error.message);
//   }
// }


// export const createCartoon = async (newCartoon) => {
//   try {
//     await axios.post(`${apiURL}/cartoons/`, newCartoon);
//   } catch (error) {
//     console.error(error.message);
//   }