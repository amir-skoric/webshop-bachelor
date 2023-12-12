//imports
import axios from "axios";

const getProducts = async (webshop) => {
  const url = import.meta.env.VITE_API_URL;
  let params = { webshop: webshop };
  try {
    let res = await axios.get(`${url}getProducts`, {
      params,
    });
    return res.data;
  } catch (error) {
    alert(error);
  }
};

export default getProducts;
