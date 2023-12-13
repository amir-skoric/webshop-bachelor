//imports
import axios from "axios";

const getWebshop = async (webshop) => {
  const url = import.meta.env.VITE_API_URL;
  try {
    let res = await axios.get(`${url}getWebshop` + webshop);
    return res.data;
  } catch (error) {
    return error;
  }
};

export default getWebshop;
