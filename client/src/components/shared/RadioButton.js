import styled from "styled-components";

const RadioButton = ({ selected, setSelected }) => {
  const toggleSelected = () => {
    setSelected(!selected);
  };

  if (selected) {
    return (
      <Circle onClick={() => toggleSelected()}>
        <SelectedCircle></SelectedCircle>
      </Circle>
    );
  }

  return <Circle onClick={() => toggleSelected()} />;
};

export default RadioButton;

const Circle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 100rem;
  border-color: var(--card-link-color);
  border-width: 2px;
  border-style: solid;
  box-sizing: border-box;
`;

const SelectedCircle = styled.div`
  cursor: pointer;
  height: 0.75rem;
  width: 0.75rem;
  background-color: var(--card-link-color);
  border-radius: 100rem;
  border-color: var(--card-link-color);
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
`;
