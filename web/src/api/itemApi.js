import axios from "axios";
import _ from "lodash";
import {
  setItemList,
  addItemToList,
  deleteItemFromList,
  updateItemInList,
} from "../state/itemState";

import store from "../store";
import { handleResourceErrors, notifySuccess } from "./shared";

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
    .catch(handleResourceErrors);
};

export const createItem = (item, callback) => {
  axios
    .post("/v1/items.json", { item: item })
    .then((response) => {
      dispatch(addItemToList(response.data.item));
      notifySuccess("Item successfully created!");
      if (!_.isNil(callback)) callback();
    })
    .catch(handleResourceErrors);
};

export const deleteItem = (itemId, callback) => {
  axios
    .delete(`/v1/items/${itemId}.json`)
    .then(() => {
      dispatch(deleteItemFromList(itemId));
      notifySuccess("Item successfully deleted!");
      if (!_.isNil(callback)) callback();
    })
    .catch(handleResourceErrors);
};

export const updateItem = (itemId, itemName, callback) => {
  axios
    .put(`/v1/items/${itemId}.json`, {
      item: { id: itemId, name: itemName },
    })
    .then((response) => {
      dispatch(updateItemInList(response.data.item));
      notifySuccess("Item successfully updated!");
      if (!_.isNil(callback)) callback();
    })
    .catch(handleResourceErrors);
};
