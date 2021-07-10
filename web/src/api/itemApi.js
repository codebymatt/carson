import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";
import {
  setItemList,
  addItemToList,
  deleteItemFromList,
  updateItemInList,
} from "../state/itemState";

import store from "../store";

const dispatch = (payload) => {
  store.dispatch(payload);
};

export const fetchItems = (callback) => {
  axios
    .get("/v1/items.json")
    .then((response) => {
      dispatch(setItemList(response.data.items));
      if (!_.isNil(callback)) callback();
    })
    .catch((error) => console.log(error));
};

export const createItem = (item, callback) => {
  axios
    .post("/v1/items.json", { item: item })
    .then((response) => {
      dispatch(addItemToList(response.data.item));
      if (!_.isNil(callback)) callback();
    })
    .catch((error) => console.log(error));
};

export const deleteItem = (itemId, callback) => {
  axios
    .delete(`/v1/items/${itemId}.json`)
    .then(() => {
      dispatch(deleteItemFromList(itemId));
      if (!_.isNil(callback)) callback();
    })
    .catch((error) => {
      console.log(error.response.data.errors);
      error.response.data.errors.forEach((message) => {
        toast.info(message);
      });
    });
};

export const updateItem = (itemId, callback) => {
  axios
    .put(`/v1/items/${itemId}.json`)
    .then((response) => {
      dispatch(updateItemInList(response.data.item));
      if (!_.isNil(callback)) callback();
    })
    .catch((error) => console.log(error));
};
