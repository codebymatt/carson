import { Box, Button, Card, Inline, TextInput } from "@sanity/ui";
import { useSelector } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";
import styled from "styled-components";

import { setNameFilterTerm, setSelectedTags } from "../state/filterState";

import { FiSearch, FiXCircle } from "react-icons/fi";

import store from "../store";
import { useEffect, useState } from "react";

const keyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
};

const delimiters = [keyCodes.comma, keyCodes.enter, keyCodes.space];

// TODO: Use tab panel to switch search types.
const FilterInput = ({ _type }) => {
  const [filterType, setFilterType] = useState("text");
  const name = useSelector((state) => state.filters.name);
  const setName = (name) => store.dispatch(setNameFilterTerm(name));

  const suggestions = useSelector((state) => state.filters.availableTags);
  const [tags, setTags] = useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  useEffect(() => {
    store.dispatch(setSelectedTags(tags.map((tag) => tag.text)));
  }, [tags]);

  return (
    <FilterWrapper>
      <FilterPicker>
        <PickerButtonWrapper>
          <FilterPickerButton
            margin={[0, 1, 0, 0]}
            text="Text"
            mode={filterType === "text" ? "" : "ghost"}
            tone="primary"
            onClick={() => setFilterType("text")}
          />
          {name.length > 0 && <Bubble />}
        </PickerButtonWrapper>
        <PickerButtonWrapper>
          <FilterPickerButton
            text="Tags"
            mode={filterType === "tags" ? "" : "ghost"}
            tone="primary"
            onClick={() => setFilterType("tags")}
          />
          {tags.length > 0 && <Bubble />}
        </PickerButtonWrapper>
      </FilterPicker>
      {filterType === "text" && (
        <TextInput
          prefix={<PrefixIcon name={name} callback={() => setName("")} />}
          onChange={(event) => setName(event.target.value)}
          placeholder="Start typing to filter by recipe name..."
          value={name}
        />
      )}
      {filterType !== "text" && (
        <TagsWrapper shadow={1} radius={2} padding={2} marginTop={0}>
          <ReactTags
            tags={tags}
            inline={true}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            minQueryLength={1}
            autocomplete
          />
        </TagsWrapper>
      )}
    </FilterWrapper>
  );
};

export default FilterInput;

const PrefixIcon = ({ name, callback }) => {
  if (name === "" || name === null || name === undefined) {
    return (
      <IconWrapper>
        <FiSearch />
      </IconWrapper>
    );
  }

  return (
    <CancelWrapper onClick={() => callback()}>
      <FiXCircle />
    </CancelWrapper>
  );
};

const FilterWrapper = styled(Box)`
  height: 5rem;
`;

const FilterPicker = styled(Inline)`
  margin-bottom: 0.5rem;
`;

const FilterPickerButton = styled(Button)`
  margin-right: 0.5rem;
`;

const PickerButtonWrapper = styled(Box)`
  position: relative;
`;

const Bubble = styled.div`
  height: 0.75rem;
  width: 0.75rem;
  background-color: #f03e2f;
  // background-color: #8690a0;
  position: absolute;
  top: -0.25rem;
  right: 0.25rem;
  border-radius: 100%;
`;

const TagsWrapper = styled(Card)`
  height: 1.5rem;

  .ReactTags__selected {
    display: flex;
    align-items: center;
  }

  .ReactTags__tags {
    overflow: hidden;
  }

  .ReactTags__tagInput {
    flex: 1;
  }

  .ReactTags__tagInputField {
    all: unset;
    width: 100%;
    margin-right: 1rem;
  }

  .tag-wrapper {
    cursor: pointer;
  }

  .ReactTags__tag {
    display: flex;
    align-items: center;
    border-style: solid;
    border-color: grey;
    border-width: 1px;
    border-radius: 5px;
    padding: 1px 5px;
    height: 1.25rem;
    margin-right: 0.5rem;
  }

  .ReactTags__remove {
    all: unset;
    background-color: white;
    border: none;
    cursor: pointer;
    margin: 0 0.1rem 0 0.25rem;
  }

  .ReactTags__suggestions {
    z-index: 20;
    position: absolute;

    mark {
      background-color: inherit;
    }

    ul {
      list-style-type: none;
      box-shadow: 0.05em 0.01em 0.5em rgba(0, 0, 0, 0.2);
      background-color: white;
      padding: 0;
      width: 10rem;
      position: absolute;

      li {
        padding: 0.5rem 0.25rem 0.5rem;
        margin: 0;
      }
    }
  }

  li.ReactTags__activeSuggestion {
    background-color: #adcafd;
  }
`;

const IconWrapper = styled.div`
  margin: 0.6rem 0.5rem 0.4rem;
`;

const CancelWrapper = styled(IconWrapper)`
  cursor: pointer;
`;
