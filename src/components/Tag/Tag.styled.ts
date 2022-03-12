import styled from "styled-components";
import { GoPlus, GoX } from "react-icons/go";
import { StyledInlineTextInput } from "../InlineTextInput/InlineTextInput.styled";

export const TagContainer = styled.div`
  display: flex;
  margin-top: 5px;
  border-radius: 5px;
  background-color: orange;
`;

export const TagNameInput = styled(StyledInlineTextInput)`
  margin: 5px;
  padding: 2px 4px 4px 4px;
  color: black;
  background-color: orange;
  font-weight: 500;
  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AddIcon = styled(GoPlus)`
  margin-left: 7px;
`;

export const RemoveIcon = styled(GoX)`
  margin-right: 10px;
  :hover {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.2);
  }
`;
