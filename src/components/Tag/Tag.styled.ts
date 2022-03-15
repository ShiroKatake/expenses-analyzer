import styled from "styled-components";

export const StyledTagContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 250px;
`;

export const StyledInput = styled.input`
  width: 192px;
`;

interface IStyledButtonProps {
  add?: boolean;
}

export const StyledButton = styled.button<IStyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.add ? "center" : "left"};
`;

export const StyledTagButton = styled(StyledButton)`
  width: 200px;
  text-overflow: ellipsis;
`;