import axios from "axios";
import toast from "react-hot-toast";

const baseURL = "http://localhost:8080";

const loginService = (email, password) => {
  return new Promise((resolve, reject) => {
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(baseURL + "/login", data)
      .then((response) => {
        resolve({
          token: response.data.token,
          email: response.data.data.email,
          username: response.data.data.name,
          userId: response.data.data.user_id,
        });
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const registerService = (email, name, password) => {
  return new Promise((resolve, reject) => {
    const data = {
      email: email,
      name: name,
      password: password,
    };

    axios
      .post(baseURL + "/register", data)
      .then((response) => {
        resolve();
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

const logout = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(baseURL + "/logout", "", config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("Error:", error.response.data);
        reject(error);
      });
  });
};

export { loginService, registerService, logout };
