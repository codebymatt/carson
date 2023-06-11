import { TextInput } from "@sanity/ui";
import { useSelector } from "react-redux";
import { setNameFilterTerm } from "../state/filterState";

import store from "../store";

const FilterInput = ({ type }) => {
  const name = useSelector((state) => state.filters.name);

  return (
    <TextInput
      onChange={(event) => {
        store.dispatch(setNameFilterTerm(event.target.value));
      }}
      placeholder="Start typing to filter recipes..."
      value={name}
    />
  );
};

export default FilterInput;
