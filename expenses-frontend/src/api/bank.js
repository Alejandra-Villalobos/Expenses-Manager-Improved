import axios from "axios";
import toast from "react-hot-toast";

const baseURL = "http://localhost:8080";

const getBanksService = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + "/bank", config)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const createBankService = (token, account, bank_name, currency, amount, username) => {
  return new Promise((resolve, reject) => {
    const data = {
      account: account,
      bank_name: bank_name,
      currency: currency,
      amount: amount,
      username: username
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(baseURL + "/bank", data, config)
      .then((response) => {
        resolve(response.data.message);
        toast.success(response.data.message)
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

export { getBanksService, createBankService }