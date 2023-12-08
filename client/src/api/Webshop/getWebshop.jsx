//imports
import axios from "axios";

const getWebshop = async (webshop) => {
  try {
    let res = await axios.get("http://localhost:4000/getWebshop" + webshop);
    return res.data;
  } catch (error) {
    alert(error.response.data.error);
    return error;
  }
};

export default getWebshop;
