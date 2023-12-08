import axios from "axios";

const getProduct = async (product) => {
  try {
    let res = await axios.get("http://localhost:4000/getProduct" + product);
    return res.data;
  } catch (error) {
    alert(error.response.data.error);
    return error;
  }
};

export default getProduct;
