import axios from "axios";

const getProduct = async (product) => {
  const url = import.meta.env.VITE_API_URL;
  try {
    let res = await axios.get(`${url}getProduct` + product);
    return res.data;
  } catch (error) {
    alert(error)
  }
};

export default getProduct;
