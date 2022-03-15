import { KeyboardEvent, RefObject, useState } from "react";
import { useTagListContext } from "..";
import { StyledTagContainer, StyledInput, StyledButton, StyledTagButton } from "./Tag.styled";
import { GoPlus, GoX } from "react-icons/go";
import { MdEdit } from "react-icons/md";

export interface ITagProps {
  onClick?: () => void;
  tagName: string;
  tagId: string;
  tagRef?: RefObject<HTMLButtonElement>;
}

export const Tag = ({ onClick, tagName, tagId, tagRef }: ITagProps) => {
  const { addEmptyTag, updateTag, removeTag } = useTagListContext();
  const [isInputOn, setInputOn] = useState(false);
  const [displayValue, setDisplayValue] = useState(tagName);
  const [inputText, setInputText] = useState(tagName);

  const isUsed = () => {
    if (displayValue === "Add tag") {
      return false;
    }
    return true
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      setInputOn(false);
      if (displayValue === inputText) {
        return;
      }

      updateTag(inputText, tagId);
      setDisplayValue(inputText);

      if (!isUsed()) {
        addEmptyTag();
      }
    } else if (event.code === "Escape") {
      setInputOn(false);
    }
  }

  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  }

  return (
    <StyledTagContainer>
      {!isInputOn && !isUsed() &&
        <StyledTagButton ref={tagRef} add onClick={() => setInputOn(true)}>
          <GoPlus />
          {displayValue}
        </StyledTagButton>
      }
      {!isInputOn && isUsed() &&
        <StyledTagButton onClick={handleOnClick}>
          {displayValue}
        </StyledTagButton>
      }
      {isInputOn &&
        <StyledInput
          autoFocus
          type="text"
          defaultValue={inputText}
          onFocus={(e) => e.target.select()}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputText(e.target.value)}
        />
      }
      {isUsed() &&
        <>
          <StyledButton onClick={() => setInputOn(true)}><MdEdit /></StyledButton>
          <StyledButton onClick={() => removeTag(tagId)}><GoX /></StyledButton>
        </>
      }
    </StyledTagContainer>
  );
}
