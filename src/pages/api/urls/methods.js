import axios from "axios";
import { urls } from "./urls";

// Generic api methods
const getAll = async (endpoint) => {
  return await axios.get(endpoint);
};

/*
 Module-wise api methods to handle post, patch and delete requests
*/
export const getStreetAddresss = async (lat, long) => {
  try {
    const url = urls.reverseGeocoding
      .replace(":latitude", lat)
      .replace(":longitude", long);
    return await getAll(url);
  } catch (err) {
    console.log(err, "error on getStreetAddresss");
    const error = err?.response?.data;
  }
};
