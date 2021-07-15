import _ from "lodash";
import { toast } from "react-toastify";

export const handleResourceErrors = (error) => {
  if (!_.isNil(error?.response?.data.errors)) {
    error.response.data.errors.forEach((message) =>
      toast.error(message),
    );
  }
};

export const notifySuccess = (message) => {
  toast.success(message);
};
