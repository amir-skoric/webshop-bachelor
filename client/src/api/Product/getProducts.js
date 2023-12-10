//imports
import axios from "axios";

const getProducts = async (webshop) => {
  let params = { webshop: webshop };
  try {
    let res = await axios.get("http://localhost:4000/getProducts", {
      params,
    });
    return res.data;
  } catch (error) {
    alert(error);
  }
};

export default getProducts;
