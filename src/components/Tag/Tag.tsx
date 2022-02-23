import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTagListContext } from "../TagManager/TagManager";
import { AddIcon, IconContainer, RemoveIcon, TagContainer, TagNameInput } from "./Tag.styled";

export interface ITagProps {
  tagId: string;
  tagName: string;
}

export const Tag = ({ tagId, tagName }: ITagProps) => {
  const [isUsed, setIsUsed] = useState(false);
  const [text, setText] = useState("");
  const { addTag, updateTag, removeTag } = useTagListContext();

  useEffect(() => {
    setText(tagName);
  }, [tagName]);

  const handleOnSave = (tagName: string) => {
    updateTag(tagName, tagId);
    if (!isUsed) {
      addTag("", uuidv4());
      setIsUsed(true);
    }
  };

  return (
    <TagContainer>
      {!isUsed && (
        <IconContainer>
          <AddIcon />
        </IconContainer>
      )}
      <TagNameInput
        placeholder="New tag"
        value={text}
        onSave={({ value }) => handleOnSave(value)}
        onChange={setText}
      />
      {isUsed && (
        <IconContainer onClick={() => removeTag(tagId)}>
          <RemoveIcon />
        </IconContainer>
      )}
    </TagContainer>
  );
};
