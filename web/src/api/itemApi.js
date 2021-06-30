import axios from "axios";
import { setItemList, deleteItemFromList } from "../state/itemState";

import store from "../store";

const dispatch = (argument) => {
  store.dispatch(argument);
};

export const fetchItems = () => {
  axios
    .get("/v1/items.json")
    .then((response) => dispatch(setItemList(response.data.items)))
    .catch((error) => console.log(error));
};

export const deleteItem = (itemId) => {
  axios
    .delete(`/v1/items/${itemId}.json`)
    .then(() => dispatch(deleteItemFromList(itemId)))
    .catch((error) => console.log(error));
};
