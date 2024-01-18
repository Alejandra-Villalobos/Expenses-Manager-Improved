import axios from "axios";
import toast from "react-hot-toast";

const baseURL = "http://localhost:8080";

const getOutcomesService = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(baseURL + "/outcome", config)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

const createOutcomeService = (
  token,
  category,
  description,
  amount,
  selected_date,
  to_account,
  to_bank,
  bank_id
) => {
  return new Promise((resolve, reject) => {
    const data = {
      category: category,
      description: description,
      amount: amount,
      selected_date: selected_date,
      to_account: to_account,
      to_bank: to_bank,
      bank_id: bank_id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(baseURL + "/outcome", data, config)
      .then((response) => {
        resolve(response.data.message);
        toast.success(response.data.message);
      })
      .catch((error) => {
        reject(error.response.data.message);
        toast.error(error.response.data.message);
      });
  });
};

export { getOutcomesService, createOutcomeService };
