import axios from "axios";
import { GiftCard } from "../../src/types/GiftCard";
import { Product } from "../../src/types/Product";

const BASE_URL = `https://eshop-dev-api.rewardscompany.io/api`;

const addProductService = async (payload: Product) => {
  try {
    const url = `${BASE_URL}/v1/eshop/`;
    const response = await axios.post(url, payload);
    return response?.data;
  } catch (error) {
    console.log(error);
    console.log(payload);
  }
};

const addCardService = async (payload: GiftCard) => {
  try {
    const url = `${BASE_URL}/v1/giftcard`;
    const response = await axios.post(url, payload);
    return response?.data;
  } catch (error) {
    console.log(error);
    console.log(payload);
  }
};

export { addProductService, addCardService };
